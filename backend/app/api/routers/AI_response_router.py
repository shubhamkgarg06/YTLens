from fastapi import APIRouter
from app.api.models.user_message_model import UserMessage
from app.api.utils.chat_workflow import main_chat_workflow

router = APIRouter()

@router.post("/{video_id}/ask")
async def get_AI_response(video_id: str, user_message: UserMessage):
    # Placeholder for the actual AI response generation logic
    # You can replace this with your actual implementation
    
    print(f"Received message for video {video_id}: {user_message.message}")
    
    
    ai_response = main_chat_workflow(video_id , user_message.message)
    
    print(f"Generated AI response for video {video_id}: {ai_response}")
    
    return {"response": ai_response}
    