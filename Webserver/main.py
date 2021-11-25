from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class LoginData(BaseModel) :
    username : str
    password : str 
@app.get("/")
async def root():
    return {"message":"Hello World"}

@app.post("/login")
async def login(data : LoginData):
    return {"status", " working"}
