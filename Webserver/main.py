from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
conn = sqlite3.connect('MainDatabase.sqlite')
cur = conn.cursor()
app = FastAPI()

class LoginData(BaseModel) :
    username : str
    password : str 
@app.get("/")
async def root():
    return {"message":"Hello World"}

@app.post("/login")
async def login(data : LoginData):
    row = cur.execute("SELECT * FROM users WHERE username=:usr_name AND  pwd=:password" , {'usr_name' : data.username , 'password' : data.password})
    data = row.fetchone()
    if data == None :
        return {"username" : "not found" , "uid" : -1}
    else :
        return {"uid" : data[0] , "username" : data[1]}

@app.post("/register")
async def register(data : LoginData):
    row = cur.execute("SELECT (username) FROM users WHERE username=:usr_name",{"usr_name" : data.username})
    if row.fetchone() != None :
        return {"status" : "-1"}  
    cur.execute("INSERT INTO users(username,pwd) VALUES (:usr_name,:passwd)",{"usr_name" : data.username , "passwd" : data.password})
    conn.commit()
    return {"status" : "99"}
