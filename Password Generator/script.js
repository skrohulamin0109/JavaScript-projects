const buttons = document.querySelectorAll(".passWordTypeBox button");
const weakBtn = document.querySelector("#Weak");
const mediumBtn = document.querySelector("#Medium");
const strongBtn = document.querySelector("#Strong");
const generateBtn = document.querySelector(".generateBtn");
const passWordBox = document.querySelector(".passWrodBox input");
const copyBtn = document.querySelector("#copyBtn");

let passWordType;
let isWeak = false;
let isMedium = false;
let isStrong = false;

generateBtn.addEventListener("click", triggerGenerate);

function triggerGenerate() {
    if (!isWeak & !isMedium & !isStrong) {
        passWordBox.value = "Selec The Type of Password Needed";
    } else {
        generatePassWord();
    }
}

copyBtn.addEventListener("click", async () => {
    if (!isWeak & !isMedium & !isStrong) {
        passWordBox.value =
            "Generate a password first.";
        return;
    }

    try {
        // Grab the value hidden inside the password input
        const passwordValue = passWordBox.value;

        // Write the password directly to the clipboard
        await navigator.clipboard.writeText(passwordValue);

        // Provide user feedback (Optional)
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 2000);
    } catch (err) {
        console.error("Failed to copy password: ", err);
        alert("Could not copy password. Please try again.");
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        passWordType = button.dataset.passType;
        if (passWordType === "weak") {
            isWeak = !isWeak;

            if (isWeak) {
                weakBtn.classList.add("weakActive");
                mediumBtn.classList.remove("mediumActive");
                strongBtn.classList.remove("strongActive");
                isMedium = false;
                isStrong = false;
            } else if (!isWeak) {
                weakBtn.classList.remove("weakActive");
            }
        } else if (passWordType === "medium") {
            isMedium = !isMedium;

            if (isMedium) {
                weakBtn.classList.remove("weakActive");
                mediumBtn.classList.toggle("mediumActive");
                strongBtn.classList.remove("strongActive");
                isWeak = false;
                isStrong = false;
            } else if (!isMedium) {
                mediumBtn.classList.remove("mediumActive");
            }
        } else if (passWordType === "strong") {
            isStrong = !isStrong;
            if (isStrong) {
                weakBtn.classList.remove("weakActive");
                mediumBtn.classList.remove("mediumActive");
                strongBtn.classList.toggle("strongActive");
                isWeak = false;
                isMedium = false;
            } else if (!isStrong) {
                strongBtn.classList.remove("strongActive");
            }
        }
    });
});

// Function to generate password depeinding on password type.

function generatePassWord() {
    let finalPass;

    // Function that makes the password depending on characters and lendths
    function generatePassword(length, characterSets) {
        let password = "";

        // Guarantee at least one character from every required set
        characterSets.forEach((characters) => {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        });

        // Combine all character sets for the remaining characters
        const allCharacters = characterSets.join("");

        while (password.length < length) {
            const randomIndex = Math.floor(
                Math.random() * allCharacters.length,
            );
            password += allCharacters[randomIndex];
        }

        // Shuffle the password so guaranteed characters aren't always at the beginning
        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    // gividing different lengths and characters to build different passwords depending on selected type of password.

    if (isWeak) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";

        finalPass = generatePassword(8, [lowercase, numbers]);
    } else if (isMedium) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        finalPass = generatePassword(12, [lowercase, uppercase, numbers]);
    } else if (isStrong) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        finalPass = generatePassword(16, [
            lowercase,
            uppercase,
            numbers,
            symbols,
        ]);
    }

    console.log(finalPass);
    passWordBox.value = finalPass;
}
