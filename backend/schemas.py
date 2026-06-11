from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    salary: int

class UserLogin(BaseModel):
    username: str
    password: str

class ExpenseCreate(BaseModel):
    username: str
    amount: int
    category: str
    date: str
    month: str