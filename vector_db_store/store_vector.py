from langchain_chroma import Chroma
from Embedding.hg_face_emb import embeddings

def store_transcript(documents, video_id):

    if not documents:
        return None


    # Create vector database
    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings, 
        persist_directory=f"./chroma_db/{video_id}"
    )

    return vector_store