//main.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch tasks on page load
    getTasks();

    // Function to create a task
    function addTask(event) {
        console.log('Creating task...');
        const title = document.getElementById('newTaskInput').value;

        const taskData = {
            title: title,
        };

        // Send a POST request to create a new task
        fetch('http://localhost:8000/api/v1/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
            .then(response => response.json())
            .then(createdTask => {
                console.log('Task created:', createdTask);
                getTasks(); // Refresh the task list
            })
            .catch(error => console.error('Error creating task:', error));
    };

    // Function to fetch all tasks
function getTasks() {
    // Send a GET request to fetch all tasks
    fetch('http://localhost:8000/api/v1/tasks/')
        .then(response => response.json())
        .then(tasks => {
            // Update the task list in the HTML
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear the existing list

            tasks.forEach(task => {
                const taskItem = document.createElement('li');

                // Display task information as editable input fields
                taskItem.innerHTML = `
                    <div class="task">
                        <input type="checkbox" class="checkbox" onchange="handleCheckboxChange(this)">
                        <input type="text" class="task-input edit" value="${task.title}">
                        <input type="date" class="task-date edit" value="${task.due_date}">
                        <button class="deleteButton" style="display: none;" onclick="deleteTask(${task.id})">Delete</button>
                        <button class="saveButton" style="display: none;" onclick="updateTask(${task.id})">Save</button>
                        <span class="info-icon">&#9432;</span>
                    </div>
                    <div class="content">
                        <textarea class="notesInput" placeholder="Notes">${task.notes}</textarea>
                    </div>
                `;

                addCollapsibleEventListener(taskItem);

                // Insert the new task at the bottom of the task list
                taskList.appendChild(taskItem);
            // clear input fields
            document.getElementById('newTaskInput').value = '';
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}


    
    function toggleExpandedBox(infoIcon, expandedBoxId) {
        const task = infoIcon.closest('.task');
        const expandedBox = task.querySelector(`#${expandedBoxId}`);
        expandedBox.style.display = expandedBox.style.display === 'block' ? 'none' : 'block';
    }

    function addCollapsibleEventListener(collapsible) {
        var content = collapsible.querySelector('.content');
        var deleteButton = collapsible.querySelector('.deleteButton');
        var saveButton = collapsible.querySelector('.saveButton');
        var span = collapsible.querySelector('.info-icon');

        span.addEventListener('click', function () {
            console.log('clicked');
            if (content.style.display === 'block') {
                deleteButton.style.display = 'none';
                saveButton.style.display = 'none';
                content.style.display = 'none';
            } else {
                deleteButton.style.display = 'block';
                saveButton.style.display = 'block';
                content.style.display = 'block';
            }
        });
    }
    

    function showHiddenTasks() {
        const hiddenTasks = document.querySelectorAll('.hidden-task');
    
        hiddenTasks.forEach(task => {
            if (task.style.display === 'none' || window.getComputedStyle(task).display === 'none') {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    
        // Update button text based on the visibility of hidden tasks
        const showMoreButton = document.querySelector('.show-more-button');
        showMoreButton.textContent = showMoreButton.textContent === 'Show hidden tasks' ? 'Hide hidden tasks' : 'Show hidden tasks';
    }

    // event listener for checkbox change
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            console.log('Checkbox changed!');
            handleCheckboxChange(checkbox);
        });
    });
    
    var collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(function (collapsible) {
        // Add event listener for existing collapsible items
        addCollapsibleEventListener(collapsible);
    });

    document.querySelector('.show-more-button').addEventListener('click', showHiddenTasks);
    
    document.getElementById('newTaskInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }
    );
});

