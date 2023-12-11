# app/db/fake_db.py
from typing import List
from app.models.task import Task

# In-memory storage for tasks (replace with a database in a real-world app)
tasks: List[Task] = []

# create a function that find a task by id inside of the model
def get_task_by_id(task_id: int):
    try:
        return tasks[task_id]
    except IndexError:
        return None
