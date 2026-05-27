from app.core.workflows.chat_workflow import main_chat_workflow
from app.core.workflows.ingest import ingest_video



def main(video_id):

    vector_store, documents = ingest_video(video_id)





