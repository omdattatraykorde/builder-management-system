from typing import Optional

from pydantic import BaseModel, ConfigDict


class MaterialBase(BaseModel):
    material_name: str
    category: Optional[str] = None
    unit: Optional[str] = None
    quantity: float = 0
    unit_price: float = 0
    supplier: Optional[str] = None
    status: str = "Available"


class MaterialCreate(MaterialBase):
    pass


class MaterialUpdate(BaseModel):
    material_name: Optional[str] = None
    category: Optional[str] = None
    unit: Optional[str] = None
    quantity: Optional[float] = None
    unit_price: Optional[float] = None
    supplier: Optional[str] = None
    status: Optional[str] = None


class MaterialResponse(MaterialBase):
    id: int

    model_config = ConfigDict(from_attributes=True)