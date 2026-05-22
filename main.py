from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.Video_operations.video_fetch_details import router as video_router


from backend.main import main

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


