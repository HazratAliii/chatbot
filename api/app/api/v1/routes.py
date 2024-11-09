from fastapi import APIRouter, HTTPException, Request
from app.models.content_model import ContentResponse, HistoryResponse
from app.services.content_service import generate_content, get_distinct_conversations, get_conversation_data # type: ignore
from pydantic import BaseModel


router = APIRouter()

class ContentRequest(BaseModel):
    user_input: str
    conversation_id: str = None 

class ContentResponse(BaseModel):
    content: str
    conversation_id: str

@router.post("/generate-content", response_model=ContentResponse)
async def generate_content_route(request: ContentRequest):
    try:
        generated_text, conversation_id = generate_content(
            user_input=request.user_input,
            conversation_id=request.conversation_id,

        )
        print("After function call")
        return {"content": generated_text, "conversation_id": conversation_id}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error generating content: {str(e)}")

@router.get("/distinct-conversations")
async def distinct_conversations_route():
    try:
        conversations =  get_distinct_conversations()
        return {"conversation_ids": conversations}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error fetching distinct conversations: {str(e)}")


@router.get("/conversation-data/{conversation_id}")
async def conversation_data_route(conversation_id: str):
    try:
        conversation_data = get_conversation_data(conversation_id)
        return {"conversation_data": conversation_data}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error fetching data for conversation {conversation_id}: {str(e)}")
