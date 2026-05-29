from langchain_chroma import Chroma
from app.utils.get_video_folder import get_video_folder

from app.models.Embedding_model import EmbeddingModel

from dotenv import load_dotenv


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


    # Create vector database
    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings, 
        persist_directory=str(db_path)
    )

    return vector_store