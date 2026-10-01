from pydantic import BaseModel
from typing import Optional


class CustomerCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None


class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True