from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class DailyProgressBase(BaseModel):
    project_id: int
    progress_date: date
    work_done: str
    issues: Optional[str] = None
    tomorrow_plan: Optional[str] = None


class DailyProgressCreate(DailyProgressBase):
    pass


class DailyProgressUpdate(BaseModel):
    progress_date: Optional[date] = None
    work_done: Optional[str] = None
    issues: Optional[str] = None
    tomorrow_plan: Optional[str] = None


class DailyProgressResponse(DailyProgressBase):
    id: int

    model_config = ConfigDict(from_attributes=True)