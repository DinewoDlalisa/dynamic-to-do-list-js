document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask () {
        const taskText = taskInput.value. trim();

        if (taskText = "") {
            alert ("Enter a task");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item')

        const removeButton = document.createElement ('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () =>taskList.removeChild(listItem);

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value.trim();

        addButton.addEventListener('click' ,addTask);

        taskInput.addEventListener('keypress', (event) => {
            if(event.key = 'Enter') {
                addTask();
            }
        });
    }
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            updateLocalStorage();
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (save) {
            updateLocalStorage();
        }

        taskInput.value = '';
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', event => {
        if (event.key = 'Enter') {
            addTask(taskInput.value);
        }
    });

    loadTasks();
});