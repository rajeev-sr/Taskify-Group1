from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import ObjectId

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
usersDB = db["users"]
tasksDB = db["tasks"]


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


async def loginCheck(email: str, password: str):
    user = await usersDB.find_one({"email": email})

    if not user:
        print("User not found.")
        return (False, "")

    if user["password"] == password:
        print("Password matched.")
        return (True, str(user["_id"]))
    else:
        print("Password mismatch.")
        return (False, "")

async def getTasks(userID: str):
    cursor = tasksDB.find({"userID": userID})
    tasks = []
    async for task in cursor:
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return tasks


@app.get("/")
def read_root():
    return {"message": "MongoDB + FastAPI working!"}

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    userEmail = data["email"]
    userPass = data["password"]
    isLogin, userID = await loginCheck(userEmail, userPass)
    if isLogin:
        return {"message": "Success", "userID": userID}
    return {"message": "Invalid email or password"}

@app.post("/tasks")
async def tasks(request: Request):
    data = await request.json()
    print("\n\n\n\n\n\n", data, "\n\n\n\n\n\n")
    userID = data["userID"]
    print(userID, "TASKS DEBUG")
    tasks = await getTasks(userID)
    # print(tasks)
    return JSONResponse(content=tasks)