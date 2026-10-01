from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
)
from sqlalchemy.sql import func

from app.core.database import Base


class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)

    material_name = Column(String(150), nullable=False)

    category = Column(String(100))

    unit = Column(String(50))

    quantity = Column(Float, default=0)

    unit_price = Column(Float, default=0)

    supplier = Column(String(150))

    status = Column(String(50), default="Available")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )