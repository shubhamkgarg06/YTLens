def get_video_folder(video_id):

    current_dir = os.path.dirname(__file__)

    base_dir = os.path.dirname(current_dir)

    video_folder = os.path.join(
        base_dir,
        "data",
        video_id
    )

    os.makedirs(
        video_folder,
        exist_ok=True
    )

    return video_folder
