from sqlalchemy import (
    Column,
    Integer,
    Date,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class WorkerAssignment(Base):
    __tablename__ = "worker_assignments"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False,
    )

    worker_id = Column(
        Integer,
        ForeignKey("workers.id"),
        nullable=False,
    )

    assigned_date = Column(
        Date,
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    project = relationship(
        "Project",
        backref="assigned_workers",
    )

    worker = relationship(
        "Worker",
        backref="assigned_projects",
    )