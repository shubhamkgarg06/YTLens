from sentence_transformers import CrossEncoder


class RerankerModel:
    
    _instance = None
    
    @classmethod
    def get_reranker(cls):
        if cls._instance is None:
            cls._instance = reranker = CrossEncoder(
                "BAAI/bge-reranker-base"
            )
        
        return cls._instance