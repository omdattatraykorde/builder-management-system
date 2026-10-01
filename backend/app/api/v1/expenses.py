from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.expense import (
    ExpenseCreate,
    ExpenseResponse,
)
from app.services.expense_service import (
    get_expenses,
    get_expense,
    create_expense,
    update_expense,
    delete_expense,
)

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[ExpenseResponse])
def read_expenses(db: Session = Depends(get_db)):
    return get_expenses(db)


@router.get("/{expense_id}", response_model=ExpenseResponse)
def read_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = get_expense(db, expense_id)

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found",
        )

    return expense


@router.post("/", response_model=ExpenseResponse)
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
):
    return create_expense(db, expense)


@router.put("/{expense_id}", response_model=ExpenseResponse)
def edit_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
):
    updated = update_expense(
        db,
        expense_id,
        expense,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Expense not found",
        )

    return updated


@router.delete("/{expense_id}")
def remove_expense(
    expense_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_expense(
        db,
        expense_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Expense not found",
        )

    return deleted