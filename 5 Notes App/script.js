const createBtn = document.querySelector(".createBtn");
const notesContainer = document.querySelector(".notes-container");

const savedNotes = localStorage.getItem("notes");

if (savedNotes) {
    notesContainer.innerHTML = savedNotes;
}

function saveNotes() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    const noteBox = document.createElement("div");
    const notePara = document.createElement("p");
    const deleteImg = document.createElement("img");
    noteBox.className = "note-box";
    notePara.setAttribute("contenteditable", "true");
    deleteImg.src = "images/delete.png";
    deleteImg.className = "delete-icon deleteBtn";
    deleteImg.setAttribute("alt", "Delete note");

    notesContainer
        .appendChild(noteBox)
        .appendChild(notePara)
        .appendChild(deleteImg);
});

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.parentElement.remove();
        saveNotes();
    }

    if (e.target.tagName === "P") {
        const currentNote = e.target;
        currentNote.onkeyup = function () {
            saveNotes();
        };
    }
});

notesContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches('[contenteditable="true"]')) {
        e.preventDefault();

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        const br = document.createElement("br");

        range.deleteContents();
        range.insertNode(br);

        range.setStartAfter(br);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
    }
});
