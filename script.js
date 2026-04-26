let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.textContent = task.text;
    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    // ✔ toggle done
    li.onclick = function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    // 🗑 delete button
    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value === "") return;

  tasks.push({ text: input.value, done: false });

  input.value = "";
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
