from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class DailyProgress(Base):
    __tablename__ = "daily_progress"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False,
    )

    progress_date = Column(
        Date,
        nullable=False,
    )

    work_done = Column(
        String(1000),
        nullable=False,
    )

    issues = Column(
        String(1000),
        nullable=True,
    )

    tomorrow_plan = Column(
        String(1000),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    project = relationship(
        "Project",
        backref="daily_progress",
    )