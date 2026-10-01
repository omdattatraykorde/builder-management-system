from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class WorkerBase(BaseModel):
    full_name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    role: Optional[str] = None
    daily_wage: float = 0
    joining_date: Optional[date] = None
    status: str = "Active"


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    role: Optional[str] = None
    daily_wage: Optional[float] = None
    joining_date: Optional[date] = None
    status: Optional[str] = None


class WorkerResponse(WorkerBase):
    id: int

    model_config = ConfigDict(from_attributes=True)