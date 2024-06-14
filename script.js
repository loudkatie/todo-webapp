document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        listItem.addEventListener('click', toggleComplete);
        taskList.appendChild(listItem);

        saveTasks();
        taskInput.value = '';
    }
}

function toggleComplete(event) {
    if (event.target.tagName.toLowerCase() === 'span') {
        event.target.classList.toggle('complete');
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('span').classList.contains('complete')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    savedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${task.completed ? 'complete' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        listItem.addEventListener('click', toggleComplete);
        taskList.appendChild(listItem);
    });
}
