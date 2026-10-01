from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Date,
    String,
)

from app.core.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    worker_id = Column(
        Integer,
        ForeignKey("workers.id", ondelete="CASCADE"),
        nullable=False,
    )

    attendance_date = Column(
        Date,
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
    )