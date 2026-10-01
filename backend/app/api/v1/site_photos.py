from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.site_photo import (
    SitePhotoCreate,
    SitePhotoUpdate,
    SitePhotoResponse,
)

from app.services.site_photo_service import (
    get_site_photos,
    create_site_photo,
    update_site_photo,
    delete_site_photo,
)

router = APIRouter(
    prefix="/site-photos",
    tags=["Site Photos"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get(
    "/project/{project_id}",
    response_model=list[SitePhotoResponse],
)
def read_site_photos(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_site_photos(db, project_id)


@router.post(
    "/",
    response_model=SitePhotoResponse,
)
def add_site_photo(
    photo: SitePhotoCreate,
    db: Session = Depends(get_db),
):
    return create_site_photo(db, photo)


@router.put(
    "/{photo_id}",
    response_model=SitePhotoResponse,
)
def edit_site_photo(
    photo_id: int,
    photo: SitePhotoUpdate,
    db: Session = Depends(get_db),
):
    updated = update_site_photo(
        db,
        photo_id,
        photo,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Photo not found",
        )

    return updated


@router.delete("/{photo_id}")
def remove_site_photo(
    photo_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_site_photo(
        db,
        photo_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Photo not found",
        )

    return deleted