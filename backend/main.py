from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://Neil:pwd@taskify.isloax3.mongodb.net/")
client = AsyncIOMotorClient(MONGO_URI)
db = client["taskify"]
users = db["users"]


class User(BaseModel):
    email: str
    password: str

class UserDB(User):
    id: str = Field(alias="_id")

class Task(BaseModel):
    userID: str
    header: str
    description: str
    status: int

class TaskDB(Task):
    id: str = Field(alias="_id")


async def loginCheck(email: str, password: str) -> bool:
    user = await users.find_one({"email": email})
    print("Queried user:", user)

    if not user:
        print("User not found.")
        return False

    if user["password"] == password:
        print("Password matched.")
        return True
    else:
        print("Password mismatch.")
        return False



@app.get("/")
def read_root():
    return {"message": "MongoDB + FastAPI working!"}

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    userEmail = data["email"]
    userPass = data["password"]
    if await loginCheck(userEmail, userPass):
        return {"message": "Success"}
    return {"message": "Failure"}
