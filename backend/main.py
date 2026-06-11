from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine
from models import Base, User, Expense
from schemas import UserCreate, UserLogin, ExpenseCreate

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# SIGNUP
@app.post("/signup")
def signup(user: UserCreate):
    db = SessionLocal()

    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        return {"success": False, "message": "User exists"}

    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.close()

    return {"success": True, "message": "Signup success"}

# LOGIN
@app.post("/login")
def login(user: UserLogin):
    db = SessionLocal()

    db_user = db.query(User).filter(User.username == user.username).first()
    db.close()

    if not db_user:
        return {"success": False, "message": "User not found"}

    if db_user.password != user.password:
        return {"success": False, "message": "Wrong password"}

    return {
        "success": True,
        "username": db_user.username,
        "salary": db_user.salary
    }

# ADD EXPENSE
@app.post("/add-expense")
def add_expense(expense: ExpenseCreate):
    db = SessionLocal()

    new_expense = Expense(**expense.dict())
    db.add(new_expense)
    db.commit()
    db.close()

    return {"success": True, "message": "Expense added"}

# GET EXPENSES
@app.get("/get-expenses/{username}")
def get_expenses(username: str):
    db = SessionLocal()

    data = db.query(Expense).filter(Expense.username == username).all()
    db.close()

    return data

# GET USER
@app.get("/get-user/{username}")
def get_user(username: str):
    db = SessionLocal()

    user = db.query(User).filter(User.username == username).first()
    db.close()

    if not user:
        return {"message": "not found"}

    return {
        "username": user.username,
        "salary": user.salary
    }