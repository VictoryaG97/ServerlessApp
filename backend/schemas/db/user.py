from sqlalchemy import Column, String, Integer

from .base import Base


class User(Base):
    __tablename__ = 'users'

    id = Column('id', Integer, primary_key=True)
    email = Column('email', String(255))
    password_hash = Column('password_hash', String(2056))
    first_name = Column('first_name', String(255))
    last_name = Column('last_name', String(255))
    fn = Column('fn', Integer)
    role = Column('role', String(255))