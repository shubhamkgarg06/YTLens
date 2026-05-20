from workflows.chat_workflow import main_chat_workflow
from workflows.ingest import ingest_video

video_id = "kqtD5dpn9C8"

def main(video_id):

    vector_store, documents = ingest_video(video_id)

    main_chat_workflow(vector_store, documents , video_id)


main(video_id)
