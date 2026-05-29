from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import  messages_from_dict
from langchain_core.documents import Document

from app.core.prompts.answer_prompt import main_workflow_prompt
from app.core.prompts.reformulation_prompt import query_reformulation_prompt
from app.core.prompts.timestamp_prompt import timestamp_extraction_prompt

from app.core.queries.semantic_search_type import get_response_semantic_type_query
from app.core.queries.timestamp_type import get_response_timestamp_type_query
from app.core.queries.time_type import get_response_times_type_query

from app.utils.get_video_folder import get_video_folder

from app.models.Embedding_model import EmbeddingModel
from app.models.llm_model import LLMModel

from dotenv import load_dotenv
import os
import json


def main_chat_workflow(video_id , user_message):
    
    load_dotenv()  # Load environment variables from .env file
    
    llm = LLMModel().get_llm()
    embeddings = EmbeddingModel().get_embeddings()
    str_output_parser = StrOutputParser()



    # ---------------------------------------------------
    # Chains
    # ---------------------------------------------------
    
    chain = (
        main_workflow_prompt
        | llm
        | str_output_parser
    )
    

    query_reformulation_chain = (
        query_reformulation_prompt
        | llm
        | str_output_parser
    )

    timestamp_extraction_chain = (
        timestamp_extraction_prompt
        | llm
        | str_output_parser
    )


    # ---------------------------------------------------
    # Chat History
    # ---------------------------------------------------

    chat_history = []

    chat_history_path = get_video_folder(video_id) / "chat_history.json"

    if chat_history_path.exists():
        try:
            with open(chat_history_path, "r", encoding="utf-8") as f:
                messages = json.load(f)

            chat_history = messages_from_dict(messages)

        except (json.JSONDecodeError, ValueError):
            # File is corrupted or invalid
            chat_history = []
        
    
    
    
    # ---------------------------------------------------
    # Documents Loading
    # ---------------------------------------------------
    
    
    documents_path = get_video_folder(video_id) / "full_document.json"
    
    if not documents_path.exists():
        print(f"Documents file not found for video ID {video_id}. Expected at {documents_path}")
        return "Sorry, I couldn't find the video content to answer your question."

    with open(documents_path, "r" , encoding="utf-8") as f:
            data = json.load(f)

    documents = [
        Document(
            page_content=item["page_content"],
            metadata=item["metadata"]
        )
        for item in data
    ]




    # ---------------------------------------------------
    # MAIN LOOP
    # ---------------------------------------------------



    # =================================================
    # TYPE 1 -> REGEX TIMESTAMP DETECTION
    # =================================================


    result = get_response_times_type_query(user_message,  video_id , chain , chat_history , documents)
        
    if(result and result.strip().upper() != "NONE"):
        return result


    # =================================================
    # TYPE 2 -> LLM TIMESTAMP EXTRACTION
    # =================================================

    
    result = get_response_timestamp_type_query(user_message,  chat_history, video_id , chain , timestamp_extraction_chain , documents)
    
    if(result and result.strip().upper() != "NONE"):
        return result


    # =================================================
    # TYPE 3 -> Semantic Search Type Query
    # =================================================
    
    result = get_response_semantic_type_query(user_message,  chat_history, video_id, chain, documents , query_reformulation_chain , embeddings)
    if(result and result.strip().upper() != "NONE"):
        return result
    
    return "Sorry, I couldn't find an answer to your question based on the video content."