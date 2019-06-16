import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

engine = create_engine(os.getenv("DB_URL"))
session = sessionmaker(bind=engine)


def get_session() -> Session:
    """Get a database session"""
    return session()