from sqlalchemy.orm import Session

from app.models.daily_progress import DailyProgress
from app.schemas.daily_progress import (
    DailyProgressCreate,
    DailyProgressUpdate,
)


def get_progress_by_project(db: Session, project_id: int):
    return (
        db.query(DailyProgress)
        .filter(DailyProgress.project_id == project_id)
        .order_by(DailyProgress.progress_date.desc())
        .all()
    )


def get_progress(db: Session, progress_id: int):
    return (
        db.query(DailyProgress)
        .filter(DailyProgress.id == progress_id)
        .first()
    )


def create_progress(
    db: Session,
    progress: DailyProgressCreate,
):
    db_progress = DailyProgress(**progress.model_dump())

    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)

    return db_progress


def update_progress(
    db: Session,
    progress_id: int,
    progress: DailyProgressUpdate,
):
    db_progress = get_progress(db, progress_id)

    if not db_progress:
        return None

    for key, value in progress.model_dump(exclude_unset=True).items():
        setattr(db_progress, key, value)

    db.commit()
    db.refresh(db_progress)

    return db_progress


def delete_progress(
    db: Session,
    progress_id: int,
):
    db_progress = get_progress(db, progress_id)

    if not db_progress:
        return None

    db.delete(db_progress)
    db.commit()

    return {"message": "Daily progress deleted successfully"}