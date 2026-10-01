from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
)

from app.services.project_service import (
    get_projects,
    get_project,
    create_project,
    update_project,
    delete_project,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.get("/", response_model=list[ProjectResponse])
def read_projects(
    db: Session = Depends(get_db),
):
    return get_projects(db)


@router.get("/{project_id}", response_model=ProjectResponse)
def read_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = get_project(
        db,
        project_id,
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.post("/", response_model=ProjectResponse)
def add_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
):
    return create_project(
        db,
        project,
    )


@router.put("/{project_id}", response_model=ProjectResponse)
def edit_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
):
    updated = update_project(
        db,
        project_id,
        project,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return updated


@router.delete("/{project_id}")
def remove_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_project(
        db,
        project_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "message": "Project deleted successfully."
    }