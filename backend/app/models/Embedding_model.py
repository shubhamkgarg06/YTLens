from langchain_huggingface import HuggingFaceEmbeddings

class EmbeddingModel:
    _instance = None

    @classmethod
    def get_embeddings(cls):
        
        
        if cls._instance is None:
            cls._instance = HuggingFaceEmbeddings(
                model_name="BAAI/bge-small-en"
            )
        return cls._instance