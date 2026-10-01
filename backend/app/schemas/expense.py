from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ExpenseBase(BaseModel):
    expense_title: str
    category: str
    amount: float
    expense_date: date
    payment_method: str
    description: Optional[str] = None
    project_id: Optional[int] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    expense_title: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[float] = None
    expense_date: Optional[date] = None
    payment_method: Optional[str] = None
    description: Optional[str] = None
    project_id: Optional[int] = None


class ExpenseResponse(ExpenseBase):
    id: int

    model_config = ConfigDict(from_attributes=True)