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


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    expense_title = Column(String(150), nullable=False)

    category = Column(String(100), nullable=False)

    amount = Column(Float, nullable=False)

    expense_date = Column(Date, nullable=False)

    payment_method = Column(String(50))

    description = Column(String(500))

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    project = relationship("Project")