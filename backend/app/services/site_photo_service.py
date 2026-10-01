from sqlalchemy.orm import Session

from app.models.site_photo import SitePhoto
from app.schemas.site_photo import (
    SitePhotoCreate,
    SitePhotoUpdate,
)


def get_site_photos(db: Session, project_id: int):
    return (
        db.query(SitePhoto)
        .filter(SitePhoto.project_id == project_id)
        .order_by(SitePhoto.created_at.desc())
        .all()
    )


def get_site_photo(db: Session, photo_id: int):
    return (
        db.query(SitePhoto)
        .filter(SitePhoto.id == photo_id)
        .first()
    )


def create_site_photo(
    db: Session,
    photo: SitePhotoCreate,
):
    db_photo = SitePhoto(**photo.model_dump())

    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)

    return db_photo


def update_site_photo(
    db: Session,
    photo_id: int,
    photo: SitePhotoUpdate,
):
    db_photo = get_site_photo(db, photo_id)

    if not db_photo:
        return None

    for key, value in photo.model_dump(exclude_unset=True).items():
        setattr(db_photo, key, value)

    db.commit()
    db.refresh(db_photo)

    return db_photo


def delete_site_photo(
    db: Session,
    photo_id: int,
):
    db_photo = get_site_photo(db, photo_id)

    if not db_photo:
        return None

    db.delete(db_photo)
    db.commit()

    return {
        "message": "Photo deleted successfully"
    }