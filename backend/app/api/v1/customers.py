from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.customer import CustomerCreate, CustomerResponse
from app.services.customer_service import (
    get_customers,
    get_customer,
    create_customer,
    update_customer,
    delete_customer,
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[CustomerResponse])
def read_customers(db: Session = Depends(get_db)):
    return get_customers(db)


@router.get("/{customer_id}", response_model=CustomerResponse)
def read_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = get_customer(db, customer_id)

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return customer


@router.post("/", response_model=CustomerResponse)
def add_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    return create_customer(db, customer)


@router.put("/{customer_id}", response_model=CustomerResponse)
def edit_customer(
    customer_id: int,
    customer: CustomerCreate,
    db: Session = Depends(get_db),
):
    updated = update_customer(db, customer_id, customer)

    if not updated:
        raise HTTPException(status_code=404, detail="Customer not found")

    return updated


@router.delete("/{customer_id}")
def remove_customer(customer_id: int, db: Session = Depends(get_db)):
    deleted = delete_customer(db, customer_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Customer not found")

    return deleted