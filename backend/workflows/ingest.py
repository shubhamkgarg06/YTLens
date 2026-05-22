from backend.vector_db_store.store_vector import store_transcript
from backend.Video_operations.video_transcribe import get_transcript
from backend.chunking.documents_chunk import create_documents

import os

from backend.Embedding.hg_face_emb import embeddings
from langchain_chroma import Chroma


def ingest_video(video_id):

    db_path = f"data/chroma_db/{video_id}"

    # ---------------------------------------------------
    # Always Create Documents
    # ---------------------------------------------------

    transcript_list = get_transcript(video_id)

    documents = create_documents(
        transcript_list,
        video_id
    )

    # ---------------------------------------------------
    # Load Existing Vector DB
    # ---------------------------------------------------

    if os.path.exists(db_path):

        print(
            f"Vector database for video ID {video_id} already exists. Loading existing DB."
        )

        vector_store = Chroma(
            persist_directory=db_path,
            embedding_function=embeddings
        )

        return vector_store, documents

    # ---------------------------------------------------
    # Otherwise Create New Vector DB
    # ---------------------------------------------------

    print("Creating new vector database...")

    vector_store = store_transcript(
        documents,
        video_id
    )

    return vector_store, documents