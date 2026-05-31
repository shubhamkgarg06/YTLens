from app.utils.answer_utils import generate_answer
from app.core.cntext_retrival.reranking import create_bm25_index, retrieval_pipeline
from app.utils.get_video_folder import get_video_folder

from app.models.Reranker_model import RerankerModel

from app.utils.context_build_utils import build_context_from_docs

import pickle

from langchain_chroma import Chroma

def get_response_semantic_type_query(user_message, chat_history, video_id , chain , documents , query_reformulation_chain , embeddings):
    
    try:
        video_folder = get_video_folder(video_id)


        refined_question = query_reformulation_chain.invoke({
            "question": user_message,
            "chat_history": chat_history
        })

        # ---------------------------------------------------
        # Retrivals
        # ---------------------------------------------------
        
        if not (video_folder / "bm25.pkl").exists():
            print(f"BM25 index not found for video ID {video_id}. Expected at {video_folder / 'bm25.pkl'}")
            return None
        
        with open(video_folder / "bm25.pkl","rb") as f:
            bm25_retriever = pickle.load(f)
        
        
        reranker = RerankerModel.get_reranker()


        # ---------------------------------------------------
        # vector store retrieval
        # ---------------------------------------------------

        db_path = video_folder / "chroma_db"
        
        if not db_path.exists():
            print(f"Vector database not found for video ID {video_id}. Expected at {db_path}")
            return None

        vector_store = Chroma(
            persist_directory=str(db_path),
            embedding_function=embeddings
        )

        # =================================================
        # STEP 1 -> SEMANTIC RETRIEVAL
        # =================================================

        docs = retrieval_pipeline(vector_store, bm25_retriever, reranker , documents, refined_question)


        # =================================================
        # STEP 2 -> BUILD CONTEXT
        # =================================================

        context = build_context_from_docs(docs)


        # =================================================
        # STEP 3 -> GENERATE FINAL ANSWER
        # =================================================

        result = generate_answer(
            chain,
            user_message,
            context,
            chat_history,
            video_id
        ) 

        return result

    except Exception as e:
        print(f"Error in get_response_semantic_type_query: {e}")
        return None




