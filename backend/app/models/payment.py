from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False,
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False,
    )

    amount = Column(
        Float,
        nullable=False,
        default=0,
    )

    payment_method = Column(
        String,
        nullable=False,
    )

    payment_date = Column(
        Date,
        nullable=False,
    )

    transaction_id = Column(
        String,
        nullable=True,
    )

    status = Column(
        String,
        default="Completed",
    )

    remarks = Column(
        String,
        nullable=True,
    )

    customer = relationship("Customer")

    project = relationship("Project")