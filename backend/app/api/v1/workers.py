from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.worker import (
    WorkerCreate,
    WorkerResponse,
)
from app.services.worker_service import (
    get_workers,
    get_worker,
    create_worker,
    update_worker,
    delete_worker,
)

router = APIRouter(
    prefix="/workers",
    tags=["Workers"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[WorkerResponse])
def read_workers(db: Session = Depends(get_db)):
    return get_workers(db)


@router.get("/{worker_id}", response_model=WorkerResponse)
def read_worker(worker_id: int, db: Session = Depends(get_db)):
    worker = get_worker(db, worker_id)

    if not worker:
        raise HTTPException(
            status_code=404,
            detail="Worker not found",
        )

    return worker


@router.post("/", response_model=WorkerResponse)
def add_worker(
    worker: WorkerCreate,
    db: Session = Depends(get_db),
):
    return create_worker(db, worker)


@router.put("/{worker_id}", response_model=WorkerResponse)
def edit_worker(
    worker_id: int,
    worker: WorkerCreate,
    db: Session = Depends(get_db),
):
    updated = update_worker(
        db,
        worker_id,
        worker,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Worker not found",
        )

    return updated


@router.delete("/{worker_id}")
def remove_worker(
    worker_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_worker(
        db,
        worker_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Worker not found",
        )

    return deleted