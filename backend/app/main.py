from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.core.database import engine, Base

# ==========================
# Import Models
# ==========================
from app.models.user import User
from app.models.customer import Customer
from app.models.project import Project
from app.models.worker import Worker
from app.models.material import Material
from app.models.expense import Expense
from app.models.payment import Payment
from app.models.daily_progress import DailyProgress
from app.models.site_photo import SitePhoto
from app.models.worker_assignment import WorkerAssignment
from app.models.attendance import Attendance

# ==========================
# Import Routers
# ==========================
from app.api.v1.auth import router as auth_router
from app.api.v1 import (
    customers,
    projects,
    workers,
    materials,
    expenses,
    payments,
    dashboard,
    daily_progress,
    site_photos,
    upload,
    worker_assignments,
    attendance,
)

# ==========================
# Create Database Tables
# ==========================
Base.metadata.create_all(bind=engine)

# ==========================
# FastAPI App
# ==========================
app = FastAPI(
    title="BuildTrack",
    version="1.0.0",
    description="Construction Site Management System API",
)

# ==========================
# Static Files
# ==========================
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Register Routers
# ==========================
app.include_router(auth_router)

app.include_router(customers.router)
app.include_router(projects.router)
app.include_router(workers.router)
app.include_router(materials.router)
app.include_router(expenses.router)
app.include_router(payments.router)

app.include_router(worker_assignments.router)
app.include_router(attendance.router)

app.include_router(daily_progress.router)
app.include_router(site_photos.router)
app.include_router(upload.router)

app.include_router(dashboard.router)

# ==========================
# Home
# ==========================
@app.get("/")
def home():
    return {
        "message": "BuildTrack Backend Running Successfully 🚀"
    }


# ==========================
# Database Test
# ==========================
@app.get("/db-test")
def test_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Database Connected Successfully 🎉",
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
        }


# ==========================
# Health Check
# ==========================
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "application": "BuildTrack",
        "version": "1.0.0",
    }