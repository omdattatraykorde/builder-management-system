from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.daily_progress import (
    DailyProgressCreate,
    DailyProgressUpdate,
    DailyProgressResponse,
)

from app.services.daily_progress_service import (
    get_progress_by_project,
    get_progress,
    create_progress,
    update_progress,
    delete_progress,
)

router = APIRouter(
    prefix="/daily-progress",
    tags=["Daily Progress"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/project/{project_id}",
    response_model=list[DailyProgressResponse],
)
def read_project_progress(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_progress_by_project(db, project_id)


@router.post(
    "/",
    response_model=DailyProgressResponse,
)
def add_progress(
    progress: DailyProgressCreate,
    db: Session = Depends(get_db),
):
    return create_progress(db, progress)


@router.put(
    "/{progress_id}",
    response_model=DailyProgressResponse,
)
def edit_progress(
    progress_id: int,
    progress: DailyProgressUpdate,
    db: Session = Depends(get_db),
):
    updated = update_progress(
        db,
        progress_id,
        progress,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Progress not found",
        )

    return updated


@router.delete("/{progress_id}")
def remove_progress(
    progress_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_progress(
        db,
        progress_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Progress not found",
        )

    return deleted