from typing import Optional

from pydantic import BaseModel, ConfigDict


class SitePhotoBase(BaseModel):
    project_id: int
    image_url: str
    caption: Optional[str] = None


class SitePhotoCreate(SitePhotoBase):
    pass


class SitePhotoUpdate(BaseModel):
    image_url: Optional[str] = None
    caption: Optional[str] = None


class SitePhotoResponse(SitePhotoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)