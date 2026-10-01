from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.material import (
    MaterialCreate,
    MaterialResponse,
)
from app.services.material_service import (
    get_materials,
    get_material,
    create_material,
    update_material,
    delete_material,
)

router = APIRouter(
    prefix="/materials",
    tags=["Materials"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[MaterialResponse])
def read_materials(db: Session = Depends(get_db)):
    return get_materials(db)


@router.get("/{material_id}", response_model=MaterialResponse)
def read_material(material_id: int, db: Session = Depends(get_db)):
    material = get_material(db, material_id)

    if not material:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return material


@router.post("/", response_model=MaterialResponse)
def add_material(
    material: MaterialCreate,
    db: Session = Depends(get_db),
):
    return create_material(db, material)


@router.put("/{material_id}", response_model=MaterialResponse)
def edit_material(
    material_id: int,
    material: MaterialCreate,
    db: Session = Depends(get_db),
):
    updated = update_material(
        db,
        material_id,
        material,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return updated


@router.delete("/{material_id}")
def remove_material(
    material_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_material(
        db,
        material_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Material not found",
        )

    return deleted