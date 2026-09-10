const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2,
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        answer: 1,
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: 2,
    },
    {
        question: "What is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean",
        ],
        answer: 3,
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "Nauru", "San Marino"],
        answer: 0,
    },
    {
        question: "What is the largest desert in the world?",
        options: [
            "Sahara Desert",
            "Gobi Desert",
            "Kalahari Desert",
            "Antarctic Desert",
        ],
        answer: 3,
    },
    {
        question: "What is the smallest continent in the world?",
        options: ["Asia", "Australia", "Europe", "Antarctica"],
        answer: 1,
    },
];

const optionsContainer = document.querySelector(".optionsContainer");
const questionElement = document.querySelector(".quizContainer h2");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function resetOptions() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function checkAnswer(e) {
    const answerIndex = questions[currentQuestionIndex].answer;
    const optionsContainer = document.querySelector(".optionsContainer");
    if (
        e.target.textContent ===
        questions[currentQuestionIndex].options[answerIndex]
    ) {
        score+=1;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
        Array.from(optionsContainer.children).forEach((button) => {
            if (
                button.textContent ===
                questions[currentQuestionIndex].options[answerIndex]
            ) {
                button.classList.add("correct");
            }
        });
    }

    Array.from(optionsContainer.children).forEach((button) => {
        button.disabled = true;
    });
}

function showQuestion() {
    resetOptions();
    questionElement.textContent = `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`;
    questions[currentQuestionIndex].options.forEach((options) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("btn");
        optionButton.textContent = options;
        optionsContainer.appendChild(optionButton);
        optionButton.addEventListener("click", checkAnswer);
    });
}

function handleNextBtn() {
    const nextBtn = document.querySelector("#nextBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const optionsContainer = document.querySelector(".optionsContainer");

      if(currentQuestionIndex === questions.length - 2) {
        nextBtn.textContent = "Finish";
    }

    if (currentQuestionIndex < questions.length - 1) {;
        currentQuestionIndex++;
        showQuestion();
    } else {
        nextBtn.style.display = "none";
        optionsContainer.style.display = "none";
        restartBtn.style.display = "block";
        questionElement.textContent = `Quiz completed! Your score is ${score} out of ${questions.length}.`;
        if (score < questions.length / 2) {
            questionElement.style.color = "red";
            questionElement.textContent += " Better luck next time!";
        } else if (score >= questions.length / 2 && score < questions.length) {
            questionElement.style.color = "orange";
            questionElement.textContent += " Good job!";
        } else if (score === questions.length) {
            questionElement.style.color = "green";
            questionElement.textContent += " Excellent work!";
        }
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    const nextBtn = document.querySelector("#nextBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const optionsContainer = document.querySelector(".optionsContainer");
    nextBtn.style.display = "block";
    nextBtn.textContent = "Next Question";
    optionsContainer.style.display = "flex";
    restartBtn.style.display = "none";
    questionElement.style.color = "black";
    showQuestion();
}

showQuestion();
