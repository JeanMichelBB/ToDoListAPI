# app/api/tasks.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.task import Task
from app.db.fake_db import tasks


router = APIRouter()

@router.post("/tasks/", response_model=Task)
def create_task(task: Task):
    tasks.append(task)
    return task

@router.get("/tasks/", response_model=List[Task])
def get_tasks():
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int):
    try:
        return tasks[task_id]
    except IndexError:
        raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    try:
        tasks.pop(task_id)
        return {"detail": "Task deleted successfully"}
    except IndexError:
        raise HTTPException(status_code=404, detail="Task not found")

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    try:
        tasks[task_id] = task
        return task
    except IndexError:
        raise HTTPException(status_code=404, detail="Task not found")
