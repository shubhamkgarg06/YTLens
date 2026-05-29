from app.utils.answer_utils import generate_answer
from app.utils.context_build_utils import build_context_from_docs 
from app.utils.get_video_folder import get_video_folder
from app.utils.context_build_utils import get_relevant_docs_by_timestamp

def get_response_timestamp_type_query(user_message,  chat_history, video_id , chain , timestamp_extraction_chain , documents):

    
    video_folder = get_video_folder(video_id)
    
    # ---------------------------------------------------
    # Time-related Keywords
    # ---------------------------------------------------

    time_keywords = [
        "minute",
        "minutes",
        "timestamp",
        "section",
        "part",
        "around",
        "time"
    ]
    
    should_try_llm_timestamp = any(
        keyword in user_message.lower()
        for keyword in time_keywords
    )

    if should_try_llm_timestamp:    
        
        
        llm_timestamp_response = timestamp_extraction_chain.invoke({
            "query": user_message
        })
        

        if llm_timestamp_response.strip().upper() != "NONE":
            
            
            try:

                start_str, end_str = llm_timestamp_response.split(",")

                start_time = int(start_str.strip())
                end_time = int(end_str.strip())

                relevant_docs = get_relevant_docs_by_timestamp(
                    documents,
                    start_time,
                    end_time
                )

                if relevant_docs:

                    context = build_context_from_docs(relevant_docs)

                    result = generate_answer(
                        chain,
                        user_message,
                        context,
                        chat_history,
                        video_id
                    )

                    return result

            except Exception as e:
                print(f"Error in get_response_timestamp_type_query: {e}")
                return None
    
    
    return None