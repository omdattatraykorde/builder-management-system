from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    project_name: str
    description: Optional[str] = None
    customer_id: int
    location: Optional[str] = None
    budget: float = 0
    status: str = "Planning"
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    project_name: Optional[str] = None
    description: Optional[str] = None
    customer_id: Optional[int] = None
    location: Optional[str] = None
    budget: Optional[float] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)