# app/db/fake_db.py
from typing import List
from app.models.task import Task

# In-memory storage for tasks (replace with a database in a real-world app)
tasks: List[Task] = []
