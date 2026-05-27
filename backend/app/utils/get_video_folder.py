from pathlib import Path

def get_video_folder(video_id):

    backend_dir = Path(__file__).resolve().parents[2]

    video_folder = backend_dir / "data" / video_id

    return video_folder