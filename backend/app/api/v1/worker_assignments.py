from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.worker_assignment import (
    WorkerAssignmentCreate,
    WorkerAssignmentResponse,
)

from app.services.worker_assignment_service import (
    get_project_workers,
    assign_worker,
    remove_worker,
)

router = APIRouter(
    prefix="/worker-assignments",
    tags=["Worker Assignments"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/project/{project_id}",
    response_model=list[WorkerAssignmentResponse],
)
def read_project_workers(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_project_workers(db, project_id)


@router.post(
    "/",
    response_model=WorkerAssignmentResponse,
)
def add_worker(
    assignment: WorkerAssignmentCreate,
    db: Session = Depends(get_db),
):
    return assign_worker(db, assignment)


@router.delete("/{assignment_id}")
def delete_worker(
    assignment_id: int,
    db: Session = Depends(get_db),
):
    deleted = remove_worker(
        db,
        assignment_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found",
        )

    return deleted