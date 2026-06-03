from app.utils.answer_utils import generate_answer
from app.utils.context_build_utils import build_context_from_docs 
from app.utils.get_video_folder import get_video_folder
from app.utils.context_build_utils import get_relevant_docs_by_timestamp

from app.services.final_results_storing.Storing_results import store_final_results
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
        "time",
        "at"
    ]
    
    should_try_llm_timestamp = any(
        keyword in user_message.lower()
        for keyword in time_keywords
    )

    if should_try_llm_timestamp:    

        print("\n Starting LLM Timestamp query try")
        
        
        llm_timestamp_response = timestamp_extraction_chain.invoke({
            "query": user_message
        })

        print("\n LLM Response: " , llm_timestamp_response)
        

        if llm_timestamp_response.strip().upper() != "NONE":
            
            
            try:

                start_str, end_str = llm_timestamp_response.split(",")

                start_time = int(start_str.strip())
                end_time = int(end_str.strip())

                print("\n")
                print("start time : " , start_time)
                print("\n end time : " , end_time)

                relevant_docs = get_relevant_docs_by_timestamp(
                    documents,
                    start_time,
                    end_time
                )

                if relevant_docs:

                    print("\nbuilding context")

                    context = build_context_from_docs(relevant_docs)

                    result = generate_answer(
                        chain,
                        user_message,
                        context,
                        chat_history,
                        video_id
                    )

                    store_final_results(
                        user_message,
                        video_id,
                        result,
                        relevant_docs,
                        "LLM Inferred Time Query",
                    )
                    return result

            except Exception as e:
                print(f"Error in get_response_timestamp_type_query: {e}")
                return None
    
    
    return None