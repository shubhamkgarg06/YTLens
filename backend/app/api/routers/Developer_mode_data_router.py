from fastapi import APIRouter, HTTPException

from app.api.utils.retrive_query_data import retrive_query_data


router = APIRouter()

@router.get("/developer_mode_data/{video_id}/{query_id}")
async def get_developer_mode_data(video_id: str, query_id: str):

    # Retriving data for respective query id

    result = retrive_query_data(video_id, query_id)

    if result is None:
        raise HTTPException(status_code=404, detail="Data not found")

    return result
