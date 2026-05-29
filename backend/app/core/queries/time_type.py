from app.utils.answer_utils import generate_answer  
from app.utils.get_video_folder import get_video_folder

from app.utils.regex_timestamp_utils import regex_timestamp_parser
from app.utils.context_build_utils import build_context_from_docs , get_relevant_docs_by_timestamp


def get_response_times_type_query(user_message , video_id , chain , chat_history , documents):
    
    timestamp_info = regex_timestamp_parser(user_message)
    video_folder = get_video_folder(video_id)
    
    print(f"\n\nTimestamp info extracted from user message: {timestamp_info}\n\n")

    if timestamp_info["found"]:
        start_time = timestamp_info["start"]
        end_time = timestamp_info["end"]



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


    return None
