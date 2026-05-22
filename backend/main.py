from backend.workflows.chat_workflow import main_chat_workflow
from backend.workflows.ingest import ingest_video



def main(video_id):

    vector_store, documents = ingest_video(video_id)

    main_chat_workflow(vector_store, documents , video_id)

