from langchain_core.messages import HumanMessage, AIMessage , messages_to_dict

from app.utils.get_video_folder import get_video_folder


import os
import json

# ---------------------------------------------------
# Final Answer Generator
# ---------------------------------------------------

def generate_answer( chain , question, context, chat_history , video_id):
    
    try:
    
        result = chain.invoke({
            "question": question,
            "context": context,
            "chat_history": chat_history
        })

    

        chat_history.append(HumanMessage(content=question))
        chat_history.append(AIMessage(content=result))

        # Keep only last 6 messages
        chat_history[:] = chat_history[-6:]

        chat_history_path = f"{get_video_folder(video_id)}/chat_history.json"


        os.makedirs(os.path.dirname(chat_history_path), exist_ok=True)

        with open(chat_history_path, "w" , encoding="utf-8") as f:
            json.dump(
                messages_to_dict(chat_history),
                f,
                indent=4,
                ensure_ascii=False
                )



        return result
    
    except Exception as e:
        print(f"Error in generate_answer: {e}")
        return None
