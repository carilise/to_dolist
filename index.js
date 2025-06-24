let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

// Charger les tâches au démarrage
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => renderTask(task.text, task.completed));
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  renderTask(taskText);
  taskInput.value = "";
  saveTasks();
}

function renderTask(taskText, isCompleted = false) {
    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.onchange = function () {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTasks();
    };

    let span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-text';

    let editButton = document.createElement('button');
    editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    editButton.onclick = function () {
        editTask(li);
    };

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delette"></ion-icon>';
    deleteButton.onclick = function () {
        deletteTask(li);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    if (isCompleted) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);
}

