from pydantic import BaseModel
from typing import List

class ContentResponse(BaseModel):
    content: str

class HistoryResponse(BaseModel):
    history: List[ContentResponse]
