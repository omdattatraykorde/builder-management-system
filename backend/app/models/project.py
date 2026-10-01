from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String(150), nullable=False)

    description = Column(String(500))

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False,
    )

    location = Column(String(255))

    budget = Column(Float, default=0)

    status = Column(
        String(50),
        default="Planning",
    )

    start_date = Column(Date)

    end_date = Column(Date)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    customer = relationship(
        "Customer",
        back_populates="projects",
    )