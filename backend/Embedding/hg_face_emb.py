from langchain_huggingface import HuggingFaceEmbeddings
from backend.chunking.transcript_chunking import split_transcript

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en",
)

def embed_text(text):
    
    if text:
        result = embeddings.embed_query(text)
        return result
    else:
        return None




# text = "What is the capital of France?"
# result = embeddings.embed_query(text)
# print(result)