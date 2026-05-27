from fastapi import APIRouter, BackgroundTasks
from yt_dlp import YoutubeDL
from app.api.models.video_url_model import VideoRequest
from app.api.utils.ingest import ingest_video

router = APIRouter()


@router.post("/video-info")
async def get_video_info(data: VideoRequest , background_tasks: BackgroundTasks):
    

    ydl_opts = {
        "quiet": True
    }

    with YoutubeDL(ydl_opts) as ydl:

        info = ydl.extract_info(
            data.url,
            download=False
        )
    
    
   
        
    
    # Schedule the background task to ingest the video URL
    background_tasks.add_task(ingest_video, data.url)
    
    
    # Return the video information as a response
    return {
        "title": info.get("title"),
        "duration": info.get("duration"),
        "uploader": info.get("uploader"),
        "thumbnail": info.get("thumbnail"),
        "views": info.get("view_count"),
        "chapters": info.get("chapters"),
        "description": info.get("description"),
    }
