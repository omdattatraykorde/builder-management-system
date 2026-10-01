from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.core.database import SessionLocal

from app.models.customer import Customer
from app.models.project import Project
from app.models.worker import Worker
from app.models.material import Material
from app.models.expense import Expense

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# Dashboard Statistics
# ==========================
@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total_customers = db.query(func.count(Customer.id)).scalar() or 0

    total_projects = db.query(func.count(Project.id)).scalar() or 0

    active_projects = (
        db.query(func.count(Project.id))
        .filter(Project.status == "In Progress")
        .scalar()
        or 0
    )

    total_workers = db.query(func.count(Worker.id)).scalar() or 0

    active_workers = (
        db.query(func.count(Worker.id))
        .filter(Worker.status == "Active")
        .scalar()
        or 0
    )

    total_materials = db.query(func.count(Material.id)).scalar() or 0

    total_expenses = (
        db.query(func.sum(Expense.amount)).scalar()
        or 0
    )

    return {
        "total_customers": total_customers,
        "total_projects": total_projects,
        "active_projects": active_projects,
        "total_workers": total_workers,
        "active_workers": active_workers,
        "total_materials": total_materials,
        "total_expenses": total_expenses,
    }


# ==========================
# Monthly Expenses Chart
# ==========================
@router.get("/monthly-expenses")
def monthly_expenses(db: Session = Depends(get_db)):

    result = (
        db.query(
            extract("month", Expense.expense_date).label("month"),
            func.sum(Expense.amount).label("amount"),
        )
        .group_by(extract("month", Expense.expense_date))
        .order_by(extract("month", Expense.expense_date))
        .all()
    )

    month_names = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    chart_data = []

    for row in result:
        chart_data.append(
            {
                "month": month_names[int(row.month) - 1],
                "amount": float(row.amount),
            }
        )

    return chart_data