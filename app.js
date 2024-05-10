document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let tasks = [];

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const timerSpan = document.createElement('span');
        timerSpan.className = 'timer';
        timerSpan.textContent = '00:00';

        li.addEventListener('click', function() {
            toggleTimer(li, timerSpan);
        });

        li.appendChild(timerSpan);

        taskList.appendChild(li);

        tasks.push({ task: task, timer: null, seconds: 0 });
    }

   
    function toggleTimer(li, timerSpan) {
        const index = Array.from(taskList.children).indexOf(li);
        const task = tasks[index];

        if (!task.timer) {
            task.timer = setInterval(() => {
                task.seconds++;
                const minutes = Math.floor(task.seconds / 60);
                const seconds = task.seconds % 60;
                timerSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        } else {
            clearInterval(task.timer);
            task.timer = null;
        }
    }

    // add a task
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            addTask(event.target.value.trim());
            event.target.value = '';
        }
    });
});
