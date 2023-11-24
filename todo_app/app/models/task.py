# app/models/task.py
from pydantic import BaseModel
from typing import List, Optional

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    reminders: Optional[List[str]] = []
    notes: Optional[str] = None
    subtasks: Optional[List[str]] = []

