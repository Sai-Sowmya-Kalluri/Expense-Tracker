from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String)
    password = Column(String)
    salary = Column(Integer)

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    amount = Column(Integer)
    category = Column(String)
    date = Column(String)
    month = Column(String)