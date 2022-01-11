from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
import json
from random import randint
conn = sqlite3.connect('MainDatabase.sqlite' , check_same_thread=False)
cur = conn.cursor()
app = FastAPI()

class LoginData(BaseModel) :
    username : str
    password : str 

class LeaderBoardFormData(BaseModel) :
    uid : int

class ScoreRequestForm(BaseModel) :
    uid : int
    score : int
class ChapterFormData(BaseModel) :
    chapter_type : str

class ChapterContentRequest(BaseModel) :
    chapter_name : str

class QuestionQuery(BaseModel) :
    num_of_question : int 
    track : str

def find_usr_data(payload : list ,uid : int) :
    place = 1 
    for i in payload :
        if i[0] != uid :
            place+=1
        else :
            return {"username" : i[1] ,"place" : place , "score" : i[2]}
    return { "status" : "uid supplied is invalid" }

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
    if data.username == "" or data.password == "" :
        return {"status" : "-1"} 
    cur.execute("INSERT INTO users(username,pwd) VALUES (:usr_name,:passwd)",{"usr_name" : data.username , "passwd" : data.password})
    conn.commit()
    return {"status" : "99"}

@app.post("/leaderboard")
async def get_leaderboard_data(data : LeaderBoardFormData) :
    row = cur.execute("SELECT uid,username,score FROM users ORDER BY score DESC")
    payload = row.fetchall()
    usr_data = find_usr_data(payload, data.uid)
    final_payload = {"usr" : usr_data , "leaderboard" : payload}
    return final_payload

@app.post("/get_chapters")
async def get_chapters(data : ChapterFormData) :
    row = cur.execute("SELECT * FROM chapters WHERE chapter_type=:chapter_type ORDER BY chapter_index",{"chapter_type" : data.chapter_type})
    payload = row.fetchall()
    return payload

@app.post("/get_chapter_data") 
async def get_content(data : ChapterContentRequest) :
    with open("./data/" + data.chapter_name + '.json') as f :
        payload = json.load(f)
        return payload

@app.post("/get_questions")
async def get_set_of_question(data : QuestionQuery) :
    # algorithm goes here
    if data.track == 'mix' :
        row = cur.execute("SELECT * FROM wordlist")
    elif data.track == 'kanji' :
        row = cur.execute("SELECT * FROM kanji_wordlist")
    else :
        row = cur.execute("SELECT * FROM wordlist WHERE type=:set_type",{"set_type" : data.track})

    # randoming
    if data.track == 'kanji' :
        kanji_list = []
        onyomi_list = []
        kunyomi_list = []
        thai_meaning_list = []
        eng_meaning_list = []
        question_set = {}
        for i in row.fetchall() :
            kanji_list.append(i[1])
            onyomi_list.append(i[2])
            kunyomi_list.append(i[3])
            thai_meaning_list.append(i[4])
            eng_meaning_list.append(i[5])
        idx = 0
        for i in range(data.num_of_question) :
            real_index = randint(0,len(kanji_list)-1)
            index1 = randint(0,len(kanji_list)-1)
            index2 = randint(0,len(kanji_list)-1)
            index3 = randint(0,len(kanji_list)-1)
            mode = randint(0,3)
            if mode == 0 :
                question_set[idx] = {"word" : kanji_list[real_index],"choices" : [onyomi_list[real_index],kunyomi_list[index1],eng_meaning_list[index2],eng_meaning_list[index3]],"key" : 1}
            elif mode == 1 : 
                question_set[idx] = {"word" : kanji_list[real_index],"choices" : [onyomi_list[index1],kunyomi_list[real_index],eng_meaning_list[index2],eng_meaning_list[index3]],"key" : 2}
            elif mode == 2 : 
                question_set[idx] = {"word" : kanji_list[real_index],"choices" : [onyomi_list[index1],kunyomi_list[index2],eng_meaning_list[real_index],eng_meaning_list[index3]],"key" : 3}
            else :
                question_set[idx] = {"word" : kanji_list[real_index],"choices" : [onyomi_list[index1],kunyomi_list[index2],eng_meaning_list[index3],eng_meaning_list[real_index]],"key" : 4}
            idx+=1
        return question_set

    else :
        jap_pron_list = []
        thai_pron_list = []
        eng_pron_list = []
        question_set = {}
        for i in row.fetchall() :
            jap_pron_list.append(i[1])
            thai_pron_list.append(i[2])
            eng_pron_list.append(i[3])
        idx = 0
        for i in range(data.num_of_question) :
            real_index = randint(0,len(jap_pron_list)-1)
            index1 = randint(0,len(jap_pron_list)-1)
            index2 = randint(0,len(jap_pron_list)-1)
            index3 = randint(0,len(jap_pron_list)-1)
            mode = randint(0,3)
            if mode == 0 :
                question_set[idx] = {"word" : jap_pron_list[real_index],"choices" : [eng_pron_list[real_index],eng_pron_list[index1],eng_pron_list[index2],eng_pron_list[index3]],"key" : 1}
            elif mode == 1 : 
                question_set[idx] = {"word" : jap_pron_list[real_index],"choices" : [eng_pron_list[index1],eng_pron_list[real_index],eng_pron_list[index2],eng_pron_list[index3]],"key" : 2}
            elif mode == 2 : 
                question_set[idx] = {"word" : jap_pron_list[real_index],"choices" : [eng_pron_list[index1],eng_pron_list[index2],eng_pron_list[real_index],eng_pron_list[index3]],"key" : 3}
            else :
                question_set[idx] = {"word" : jap_pron_list[real_index],"choices" : [eng_pron_list[index1],eng_pron_list[index2],eng_pron_list[index3],eng_pron_list[real_index]],"key" : 4}
            idx+=1
        return question_set

@app.post("/update_score")
def update_score(data : ScoreRequestForm) :
    try :
        row = cur.execute("SELECT score FROM users WHERE uid=:user_id_reserved",{"user_id_reserved" : data.uid})
        payload = row.fetchone()
        print(payload)
        curr_score = payload[0]
        curr_score += data.score
        cur.execute("UPDATE users SET score=? WHERE uid=?",(curr_score , data.uid))
        conn.commit()
        return {"status" : 99}
    except :
        return {"status" : -1}