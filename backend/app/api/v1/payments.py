from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.payment import (
    PaymentCreate,
    PaymentUpdate,
    PaymentResponse,
)

from app.services.payment_service import (
    get_payments,
    get_payment,
    create_payment,
    update_payment,
    delete_payment,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# Get All Payments
# ==========================
@router.get("/", response_model=list[PaymentResponse])
def read_payments(db: Session = Depends(get_db)):
    return get_payments(db)


# ==========================
# Get Payment By ID
# ==========================
@router.get("/{payment_id}", response_model=PaymentResponse)
def read_payment(
    payment_id: int,
    db: Session = Depends(get_db),
):
    payment = get_payment(db, payment_id)

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return payment


# ==========================
# Create Payment
# ==========================
@router.post("/", response_model=PaymentResponse)
def add_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
):
    return create_payment(db, payment)


# ==========================
# Update Payment
# ==========================
@router.put("/{payment_id}", response_model=PaymentResponse)
def edit_payment(
    payment_id: int,
    payment: PaymentUpdate,
    db: Session = Depends(get_db),
):
    updated = update_payment(
        db,
        payment_id,
        payment,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return updated


# ==========================
# Delete Payment
# ==========================
@router.delete("/{payment_id}")
def remove_payment(
    payment_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_payment(db, payment_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Payment not found",
        )

    return {
        "message": "Payment deleted successfully"
    }