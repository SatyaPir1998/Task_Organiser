document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let tasks = [];

    // Function to add a task
    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        // Create a span element for the timer
        const timerSpan = document.createElement('span');
        timerSpan.className = 'timer';
        timerSpan.textContent = '00:00';

        // Add click event listener to start/stop timer
        li.addEventListener('click', function() {
            toggleTimer(li, timerSpan);
        });

        // Append timerSpan to the list item
        li.appendChild(timerSpan);

        // Append list item to the taskList
        taskList.appendChild(li);

        // Add task to the tasks array
        tasks.push({ task: task, timer: null, seconds: 0 });
    }

    // Function to toggle timer
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

    // Listen for Enter key press to add a task
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            addTask(event.target.value.trim());
            event.target.value = '';
        }
    });
});
