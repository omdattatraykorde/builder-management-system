from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


# ==========================
# Base Schema
# ==========================
class PaymentBase(BaseModel):
    customer_id: int
    project_id: int
    amount: float
    payment_method: str
    payment_date: date
    transaction_id: Optional[str] = None
    status: str = "Completed"
    remarks: Optional[str] = None


# ==========================
# Create
# ==========================
class PaymentCreate(PaymentBase):
    pass


# ==========================
# Update
# ==========================
class PaymentUpdate(PaymentBase):
    pass


# ==========================
# Response
# ==========================
class PaymentResponse(PaymentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)