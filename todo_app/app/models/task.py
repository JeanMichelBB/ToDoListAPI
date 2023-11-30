# app/models/task.py
from pydantic import BaseModel
from typing import List, Optional

class Task(BaseModel):
    completed: bool = False
    title: str
    due_date: Optional[str] = None
    notes: Optional[str] = None
    subtasks: Optional[List[str]] = []

