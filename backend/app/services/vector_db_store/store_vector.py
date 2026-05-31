from langchain_chroma import Chroma
from app.utils.get_video_folder import get_video_folder

from app.models.Embedding_model import EmbeddingModel

from dotenv import load_dotenv
import os


def store_to_vector_db(documents, video_id):
    
    load_dotenv()  # Load environment variables from .env file
    
    embeddings = EmbeddingModel().get_embeddings()
    
    video_folder = get_video_folder(video_id)
    
    if not video_folder.exists():
        video_folder.mkdir(
            parents=True,
            exist_ok=True
        )
    
    if not documents:
        return None
    
    db_path = video_folder / "chroma_db"
    
    if os.path.exists(db_path):
        print(f"Vector database already exists for video ID {video_id}. Loading existing database.")
        vector_store = Chroma(
            embedding_function=embeddings,
            persist_directory=str(db_path)
        )
        return vector_store


    # Create vector database
    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings, 
        persist_directory=str(db_path)
    )

    return vector_store