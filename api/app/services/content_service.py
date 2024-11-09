import requests
from groq import Groq
from app.db.database import db
from datetime import datetime
import uuid
from bson import ObjectId
from .. import config

GROQ_API_URL = config.GROQ_API_URL

def serialize_object_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: serialize_object_id(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [serialize_object_id(item) for item in obj]
    else:
        return obj


current_conversation_id = str(uuid.uuid4())  

def generate_content(user_input, conversation_id, api_key=config.GROQ_API_KEY):
    if not conversation_id:
        conversation_id = str(uuid.uuid4())

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    payload = {
        'prompt': user_input,
        'max_tokens': 100
    }

    client = Groq(api_key=api_key)

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": user_input}],
        model="llama-3.2-11b-vision-preview"
    )

    if response.choices:
        generated_text = response.choices[0].message.content
    else:
        raise Exception("No response received from GROQ API")

    conversation_entry = {
        'conversation_id': conversation_id,
        'timestamp': datetime.now(),
        'user_input': user_input,
        'response': generated_text
    }

    db['content_history'].insert_one(conversation_entry)

    return generated_text, conversation_id

def get_distinct_conversations():
    distinct_conversations = db['content_history'].distinct('conversation_id')
    return distinct_conversations


def get_conversation_data(conversation_id):
    conversation_data = db['content_history'].find({'conversation_id': conversation_id})
    conversation_data_list = list(conversation_data)
    return [serialize_object_id(doc) for doc in conversation_data_list]
