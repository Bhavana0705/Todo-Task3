document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task${task.completed ? ' completed' : ''}`;
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-buttons">
                    <button class="task-button edit">Edit</button>
                    <button class="task-button delete">Delete</button>
                </div>
            `;
            li.querySelector('.task-text').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });
            li.querySelector('.edit').addEventListener('click', () => {
                const newTaskText = prompt('Edit task:', task.text);
                if (newTaskText) {
                    task.text = newTaskText;
                    saveTasks();
                    renderTasks();
                }
            });
            li.querySelector('.delete').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            taskList.appendChild(li);
        });
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
