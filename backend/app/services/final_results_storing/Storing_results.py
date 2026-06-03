from app.utils.get_video_folder import get_video_folder

import json

def store_final_results(user_message , video_id , response="" , documents=[] , response_type="" , reformulated_query = "" ):

    video_folder = get_video_folder(video_id)

    final_results_path = video_folder / "final_results.json"


    with open(final_results_path, "r", encoding="utf-8") as f:
        existing_results = f.read()
        if existing_results.strip() == "":
            existing_results = "[]"
        existing_results = json.loads(existing_results)
    

    if reformulated_query == "" :
        reformulated_query = user_message

    
    new_result_entry = {
        "id": existing_results[-1]["id"] + 1 if existing_results else 1,
        "data" : {
            "user_message": user_message,
            "reformulated_query": reformulated_query,
            "response_type": response_type,
            "chunks": [
                {
                    "chunk_id": doc.metadata.get("chunk_index"),
                    "page_content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in documents
            ],
            "response": response
        }
    }

    existing_results.append(new_result_entry)

    with open(final_results_path, "w", encoding="utf-8") as f:
        json.dump(existing_results, f, ensure_ascii=False, indent=4)


    print(f"Final results stored successfully for query {user_message} with response type {response_type}.")

    