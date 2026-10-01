from datetime import date

from sqlalchemy.orm import Session

from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate


def get_attendance_by_project(
    db: Session,
    project_id: int,
):
    return (
        db.query(Attendance)
        .filter(Attendance.project_id == project_id)
        .order_by(Attendance.attendance_date.desc())
        .all()
    )


def get_attendance_by_date(
    db: Session,
    project_id: int,
    attendance_date: date,
):
    return (
        db.query(Attendance)
        .filter(
            Attendance.project_id == project_id,
            Attendance.attendance_date == attendance_date,
        )
        .all()
    )


def create_attendance(
    db: Session,
    attendance: AttendanceCreate,
):
    existing = (
        db.query(Attendance)
        .filter(
            Attendance.project_id == attendance.project_id,
            Attendance.worker_id == attendance.worker_id,
            Attendance.attendance_date == attendance.attendance_date,
        )
        .first()
    )

    if existing:
        existing.status = attendance.status
        db.commit()
        db.refresh(existing)
        return existing

    db_attendance = Attendance(
        **attendance.model_dump()
    )

    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)

    return db_attendance


def update_attendance(
    db: Session,
    attendance_id: int,
    status: str,
):
    attendance = (
        db.query(Attendance)
        .filter(Attendance.id == attendance_id)
        .first()
    )

    if not attendance:
        return None

    attendance.status = status

    db.commit()
    db.refresh(attendance)

    return attendance


def delete_attendance(
    db: Session,
    attendance_id: int,
):
    attendance = (
        db.query(Attendance)
        .filter(Attendance.id == attendance_id)
        .first()
    )

    if not attendance:
        return None

    db.delete(attendance)
    db.commit()

    return {
        "message": "Attendance deleted successfully"
    }