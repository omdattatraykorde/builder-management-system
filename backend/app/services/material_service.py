from sqlalchemy.orm import Session

from app.models.material import Material
from app.schemas.material import MaterialCreate


def get_materials(db: Session):
    return db.query(Material).all()


def get_material(db: Session, material_id: int):
    return (
        db.query(Material)
        .filter(Material.id == material_id)
        .first()
    )


def create_material(db: Session, material: MaterialCreate):
    db_material = Material(**material.model_dump())

    db.add(db_material)
    db.commit()
    db.refresh(db_material)

    return db_material


def update_material(
    db: Session,
    material_id: int,
    material: MaterialCreate,
):
    db_material = get_material(db, material_id)

    if not db_material:
        return None

    for key, value in material.model_dump().items():
        setattr(db_material, key, value)

    db.commit()
    db.refresh(db_material)

    return db_material


def delete_material(db: Session, material_id: int):
    db_material = get_material(db, material_id)

    if not db_material:
        return None

    db.delete(db_material)
    db.commit()

    return {
        "message": "Material deleted successfully"
    }