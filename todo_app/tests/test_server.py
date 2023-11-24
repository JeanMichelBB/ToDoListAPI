# tests/test_server.py
import requests


# Create a task with value and 3 subtasks
task_data = {
    "title": "Create a task with subtasks",
    "description": "This is the main task",
    "subtasks": ["Subtask 1", "Subtask 2", "Subtask 3"]
}

# Update the endpoint to use the correct URL with /api/v1 prefix
response = requests.post('http://localhost:8000/api/v1/tasks/', json=task_data)
created_task = response.json()

print("Created Task:")
print(created_task)

# Get all tasks
response = requests.get('http://localhost:8000/api/v1/tasks/')
tasks = response.json()
print("\nAll Tasks:")
print(tasks)
