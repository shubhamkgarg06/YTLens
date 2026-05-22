from fastapi import APIRouter
from pydantic import BaseModel
from yt_dlp import YoutubeDL


router = APIRouter()

class VideoRequest(BaseModel):
    url: str


@router.post("/video-info")
async def get_video_info(data: VideoRequest):
    

    ydl_opts = {
        "quiet": True
    }

    with YoutubeDL(ydl_opts) as ydl:

        info = ydl.extract_info(
            data.url,
            download=False
        )

    return {
        "title": info.get("title"),
        "duration": info.get("duration"),
        "uploader": info.get("uploader"),
        "thumbnail": info.get("thumbnail"),
        "views": info.get("view_count"),
        "chapters": info.get("chapters"),
        "description": info.get("description"),
    }
