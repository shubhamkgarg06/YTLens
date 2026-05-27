from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers.video_url_router import router as video_router



app = FastAPI()
# Configure CORS to allow requests from the frontend

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the video router

@app.get('/')
def home():
    """
    Home endpoint that returns a welcome message.
    """
    return {"message": "Welcome to YTLens!"}


# Include the video router

app.include_router(
    video_router,
    tags=["Video Operations"]
)
