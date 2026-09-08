const taskName = document.querySelector(".inputBox input");
const listContainer = document.querySelector(".listContainer");

function addTask() {
    if (taskName.value === "") {
        alert("Task can not be empty");
    } else {
        const li = document.createElement("li");
        li.innerHTML = taskName.value;
        listContainer.appendChild(li);
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    taskName.value = "";
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false); // last parameter is the evernporpagation value, deafult is false.

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
  listContainer.innerHTML = localStorage.getItem('data')
}

showData()