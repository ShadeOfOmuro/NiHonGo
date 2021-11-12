from fastapi import FastAPI
import sqlite3
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
    conn = sqlite3.connect("MainDataBase.sqlite")
    print("Connection Succeed!")
    curr = conn.cursor()
    print(data.username,data.password)
    curr.execute("SELECT uid,username FROM users WHERE username=? AND pwd=?",(data.username,data.password))
    print(curr.rowcount)
    if  curr.rowcount != -1 :
        x = curr.fetchone()
        return {
            "uid" : x[0],
            "username" : x[1]
        }
    else :
        return {
            "uid" : "not found",
            "username" : "not found"
        }
