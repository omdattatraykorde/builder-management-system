from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class WorkerAssignmentBase(BaseModel):
    project_id: int
    worker_id: int
    assigned_date: Optional[date] = None


class WorkerAssignmentCreate(WorkerAssignmentBase):
    pass


class WorkerAssignmentResponse(WorkerAssignmentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)