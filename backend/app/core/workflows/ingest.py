from app.services.vector_db_store.store_vector import store_transcript
from app.services.Video_operations.video_transcribe import get_transcript
from app.services.chunking.documents_chunk import create_documents

import os

from app.services.Embedding.hg_face_emb import embeddings
from langchain_chroma import Chroma

from app.utils.get_video_folder import get_video_folder

def ingest_video(video_id):

    video_folder = get_video_folder(video_id)

    if os.path.exists(video_folder):

        print(
            f"Vector database for video ID {video_id} already exists. Loading existing DB."
        )
        
    # ---------------------------------------------------
    # Otherwise Create New Vector DB
    # ---------------------------------------------------
    
    transcript_list = get_transcript(video_id)
    
    if transcript_list is None:
        print(f"No transcript available for video ID {video_id}. Ingestion aborted.")
        return None, None
    
    documents = create_documents(transcript_list, video_id)

    print("Creating new vector database...")

    vector_store = store_transcript(
        documents,
        video_id
    )
    
    print("Processing Complete.")
