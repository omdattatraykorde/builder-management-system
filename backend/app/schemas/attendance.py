from datetime import date
from pydantic import BaseModel, ConfigDict


class AttendanceBase(BaseModel):
    project_id: int
    worker_id: int
    attendance_date: date
    status: str


class AttendanceCreate(AttendanceBase):
    pass


class AttendanceUpdate(BaseModel):
    status: str


class AttendanceResponse(AttendanceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)