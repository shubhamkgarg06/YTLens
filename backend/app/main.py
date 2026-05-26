from app.core.workflows.chat_workflow import main_chat_workflow
from app.core.workflows.ingest import ingest_video



def main(video_id):

    vector_store, documents = ingest_video(video_id)

    main_chat_workflow(vector_store, documents , video_id)



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.Video_operations.video_fetch_details import router as video_router



app = FastAPI()

app.include_router(video_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # later replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    """
    Home endpoint that returns a welcome message.
    """
    return {"message": "Welcome to YTLens!"}


