from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.attendance import (
    AttendanceCreate,
    AttendanceResponse,
)

from app.services.attendance_service import (
    create_attendance,
    get_attendance_by_project,
)

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/project/{project_id}",
    response_model=list[AttendanceResponse],
)
def read_project_attendance(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_attendance_by_project(
        db,
        project_id,
    )


@router.post(
    "/",
    response_model=AttendanceResponse,
)
def save_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    return create_attendance(
        db,
        attendance,
    )