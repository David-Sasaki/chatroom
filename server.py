from fastapi import FastAPI, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from bson import ObjectId
from typing import List
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017'))
db = client['chatroom_db']
messages_collection = db.messages

class Message(BaseModel):
    content: str
    time: str

@app.post("/messages/create", response_model=Message, status_code=status.HTTP_201_CREATED)
def create_message(message: Message):
    new_message = jsonable_encoder(message)
    new_message_id = messages_collection.insert_one(new_message).inserted_id
    created_message = messages_collection.find_one({"_id": new_message_id})
    return created_message

@app.get("/messages/read", response_model=List[Message])
def read_message():
    messages = messages_collection.find()
    if messages is not None:
        return messages
    raise HTTPException(status_code=404, detail="No messages!")

# @app.put("/messages/update/{message_id}", response_model=message)
# def update_message(message_id: str, message: message):
#     updated_message = messages_collection.find_one_and_update(
#         {"id": message_id},
#         {"$set": jsonable_encoder(message)},
#         return_document=ReturnDocument.AFTER
#     )
#     if updated_message is not None:
#         return updated_message
#     raise HTTPException(status_code=404, detail=f"Id {message_id} not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
