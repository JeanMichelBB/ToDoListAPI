//main.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch tasks on page load
    getTasks();

    // Function to create a task
    function addTask(event) {
        console.log('Creating task...');
        const title = document.getElementById('newTaskInput').value;
        const id = Math.floor(Math.random() * 1000); // Generate a random ID

        const taskData = {
            id: id,
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
                // Clear the input field
                document.getElementById('newTaskInput').value = '';
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
                            <input type="checkbox" class="checkbox" id="task-${task.id}">
                            <input type="text" class="task-input edit" value="${task.title}">
                        </div>
                    `;

                    // Add event listener for checkbox
                    taskItem.querySelector('.checkbox').addEventListener('change', function (event) {
                        if (event.target.checked) {
                            console.log('Deleting task with id:', task.id);
                            // Set a 2-second delay before deleting the task
                            const timerId = setTimeout(function () {
                                deleteTask(task.id);
                            }, 2000); // 2000 milliseconds = 2 seconds

                            // Store the timerId in a data attribute of the checkbox
                            event.target.dataset.timerId = timerId;
                        } else {
                            // If unchecked, cancel the timer and prevent the deletion
                            const timerId = event.target.dataset.timerId;
                            if (timerId) {
                                clearTimeout(timerId); // Cancel the timer
                                console.log('Deletion canceled for task with id:', task.id);
                            }
                        }
                    });

                    // Add event listener for task title for updating the task
                    taskItem.querySelector('.task-input').addEventListener('keydown', function (event) {
                        if (event.key === 'Enter') {
                            console.log('Updating task with id:', task.id);
                            updateTask(task.id, event.target.value);
                        }
                    });

                    // Insert the new task at the bottom of the task list
                    taskList.appendChild(taskItem);
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to delete a task
    function deleteTask(taskId) {
        // Send a DELETE request to delete the task
        fetch(`http://localhost:8000/api/v1/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log(`Task ${taskId} deleted`);
                getTasks(); // Refresh the task list
            })
            .catch(error => console.error(`Error deleting task ${taskId}:`, error));
    }
    function updateTask(taskId, updatedTitle) {
        fetch(`http://localhost:8000/api/v1/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: taskId, title: updatedTitle }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedTask => {
                console.log('Task updated:', updatedTask);
                getTasks(); // Refresh the task list
            })
            .catch(error => {
                console.error(`Error updating task ${taskId}:`, error.message);
                // Additional error handling if needed
            });
    }
    
    

    document.getElementById('newTaskInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
});
