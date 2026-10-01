from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    phone = Column(String(20), unique=True)

    email = Column(String(100), unique=True)

    address = Column(String(255))

    city = Column(String(100))

    state = Column(String(100))

    pincode = Column(String(10))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    projects = relationship(
        "Project",
        back_populates="customer",
        cascade="all, delete-orphan",
    )