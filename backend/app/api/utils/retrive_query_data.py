from app.utils.get_video_folder import get_video_folder
import json

def retrive_query_data(video_id , query_id):
    
    video_folder = get_video_folder(video_id)
    
    # Implement your logic to retrieve developer mode data here
    # You can use the video_folder and query_id to locate the relevant data
    
    data_path = video_folder / "final_results.json"

    with open(data_path, "r", encoding="utf-8") as f:
        existing_results = f.read()
        if existing_results.strip() == "":
            existing_results = "[]"
        existing_results = json.loads(existing_results)

    
    for result in existing_results:
        if str(result["id"]) == query_id:
            return result
    
    return None