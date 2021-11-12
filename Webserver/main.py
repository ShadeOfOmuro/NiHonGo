from fastapi import FastAPI
import sqlite3
app = FastAPI()

@app.get("/")
async def root():
    return {"message":"Hello World"}

@app.post("/login")
async def login(username : str , password : str):
    conn = sqlite3.connect("MainDataBase.sqlite")
    query = "SELECT uid,username from users WHERE username='{}' AND password='{}'".format(username,password)
    print("Connection Succeed!")
    cursor = conn.execute(query)
    for x in cursor :
        uid = x[0]
        username = x[1]
    return {"uid" : uid , "username" : username} if (cursor.rowcount != 0) else {"uid" : "not found" , "username" : "not found"}