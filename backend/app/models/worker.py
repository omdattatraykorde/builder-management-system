from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
)
from sqlalchemy.sql import func

from app.core.database import Base


class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    phone = Column(String(20), unique=True)

    email = Column(String(100), unique=True)

    address = Column(String(255))

    role = Column(String(100))

    daily_wage = Column(Float, default=0)

    joining_date = Column(Date)

    status = Column(String(50), default="Active")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )