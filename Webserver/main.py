from typing import Optional
from fastapi import FastAPI

app = FastAPI()

@app.get("/get_word_set/ping")
def read_root():
    return {"status": "I'm alive"}

