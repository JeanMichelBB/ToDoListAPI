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

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    try:
        task_id = task_id - 1
        tasks[task_id] = updated_task
        return updated_task
    except IndexError:
        raise HTTPException(status_code=404, detail="Task not found")
    
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    try:
        tasks = [task for task in tasks if task.id != task_id]
        return {"detail": "Task deleted successfully"}
    except IndexError:
        raise HTTPException(status_code=404, detail="Task not found")
