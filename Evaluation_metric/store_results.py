import os
import json

def export_results_to_json(documents, video_id , query):

    current_dir = os.path.dirname(__file__)
    base_dir = os.path.dirname(current_dir)

    output_path = os.path.join(
        base_dir,
        "data",
        video_id,
        "retrieval_results.json"
    )

    
    # Create folder automatically
    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

     # -----------------------------------
    # Load existing data if file exists
    # -----------------------------------

    existing_data = []

    if os.path.exists(output_path):

        with open(output_path, "r", encoding="utf-8") as f:

            existing_data = json.load(f)



    
    chunks = []

    for doc in documents:
        chunks.append(doc.metadata["chunk_index"])

    
    existing_data.append(
        { 
            "query": query,
            "retrieved_chunks": chunks
        }
    )

    with open(output_path, "w", encoding="utf-8") as f:

        json.dump(
            existing_data,
            f,
            indent=4,
            ensure_ascii=False
        )
    

    