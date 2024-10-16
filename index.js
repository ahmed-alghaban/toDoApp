let toDoList = [];
const toDoFromElement = document.getElementById("to-do-form");
const toDoInputElement = document.getElementById("to-do-input");
const addToDoButton = document.getElementById("to-do-button");
const toDoUlItem = document.getElementById("to-do-task-item");
let idCounter = 0;
let toDoCounter = document.getElementById("counter");
const generateSequentialId = () => {
    return ++idCounter;
}

const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("ToDoTask"));
    if (storedTasks) {
        toDoList = storedTasks;
        diplayInfo();
    }
};

const addToDo = (e) => {
    e.preventDefault();
    const newTask = {
        id: generateSequentialId(),
        Task: toDoInputElement.value
    };
    if (newTask.Task) {
        toDoList.push(newTask);
        localStorage.setItem("ToDoTask", JSON.stringify(toDoList));
        diplayInfo();
        toDoInputElement.value = "";
    }
};
addToDoButton.addEventListener("click", addToDo);

const removeItem = (id) => {
    toDoList = toDoList.filter((task) => task.id !== id);
    localStorage.setItem("ToDoTask", JSON.stringify(toDoList));
    diplayInfo();
};

const diplayInfo = () => {
    toDoUlItem.innerHTML = "";
    toDoList.map((task) => {
        const { id, Task } = task;
        let ulElement = document.createElement("div");
        ulElement.innerHTML = Task;
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", () => {
            removeItem(id);
        });
        let checkTask = document.createElement("input");
        checkTask.type = "checkbox";
        ulElement.appendChild(removeButton);
        ulElement.appendChild(checkTask);
        toDoUlItem.appendChild(ulElement);
    });
    toDoCounter.innerHTML = "Counter: "+toDoList.length;
};
loadTasks();




