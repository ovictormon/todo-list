const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(addTask);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  addTask(task);

  input.value = "";
});

function addTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    task.completed = !task.completed;
    saveTasks();
    li.classList.toggle("completed");
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";

  removeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    tasks = tasks.filter((t) => t !== task);
    saveTasks();
    li.remove();
  });

  li.appendChild(removeButton);
  list.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
