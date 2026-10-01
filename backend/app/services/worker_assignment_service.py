from sqlalchemy.orm import Session

from app.models.worker_assignment import WorkerAssignment
from app.schemas.worker_assignment import WorkerAssignmentCreate


def get_project_workers(
    db: Session,
    project_id: int,
):
    return (
        db.query(WorkerAssignment)
        .filter(
            WorkerAssignment.project_id == project_id
        )
        .all()
    )


def assign_worker(
    db: Session,
    assignment: WorkerAssignmentCreate,
):
    existing = (
        db.query(WorkerAssignment)
        .filter(
            WorkerAssignment.project_id == assignment.project_id,
            WorkerAssignment.worker_id == assignment.worker_id,
        )
        .first()
    )

    if existing:
        return existing

    db_assignment = WorkerAssignment(
        **assignment.model_dump()
    )

    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)

    return db_assignment


def remove_worker(
    db: Session,
    assignment_id: int,
):
    assignment = (
        db.query(WorkerAssignment)
        .filter(
            WorkerAssignment.id == assignment_id
        )
        .first()
    )

    if not assignment:
        return None

    db.delete(assignment)
    db.commit()

    return {
        "message": "Worker removed successfully"
    }