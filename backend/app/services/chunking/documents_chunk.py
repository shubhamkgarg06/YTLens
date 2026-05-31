from langchain_core.documents import Document

import json
import os

from app.utils.get_video_folder import get_video_folder



def export_chunks_to_json(documents, video_id):

    video_folder = get_video_folder(video_id)
    
    output_path = os.path.join(
        video_folder,
        "chunks.json"
    )
    
    chunk_data = []

    for i, doc in enumerate(documents):

        chunk_info = {

            "chunk_id": i,

            "text": doc.page_content,

            "metadata": doc.metadata
        }

        chunk_data.append(chunk_info)

    with open(output_path, "w", encoding="utf-8") as f:

        json.dump(
            chunk_data,
            f,
            indent=4,
            ensure_ascii=False
        )

    print(f"Saved {len(chunk_data)} chunks.")
    
    


def create_documents(transcript_list, video_id):

    documents = []

    n = len(transcript_list)
    i = 0

    while i<n:

        current_chunk = ""

        chunk_start = None
        chunk_end = None

        j = i

        while j<n and len(current_chunk) < 1000:

            item = transcript_list[j]

            text = item.text
            start = item.start
            duration = item.duration

            end = start + duration

            # Initialize chunk start
            if chunk_start is None:
                chunk_start = start

            # Add transcript text to current chunk
            current_chunk += text + " "

            # Update chunk end
            chunk_end = end

            j+=1

        

        doc = Document(

            page_content=current_chunk,

            metadata={
                "chunk_index": len(documents),
                "video_id": video_id,
                "start_time": chunk_start,
                "end_time": chunk_end
            }
        )

        documents.append(doc)

        # Reset chunk
        current_chunk = ""
        chunk_start = None
        chunk_end = None
        # Step  back to reprocess last transcript in next chunk

        if(j-i > 2):
            i = j-2

        else:
            i = j


    # export_chunks_to_json(documents, video_id)
    
    video_folder = get_video_folder(video_id)
    
    output_path = os.path.join(
        video_folder,
        "full_document.json"
    )
    
    if os.path.exists(output_path):
        print(f"Full document JSON already exists at {output_path}. Skipping export.")
        return documents
    
    with open(output_path,"w",encoding="utf-8") as f:

        json.dump(
            [
                {
                    "page_content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in documents
            ],
            f,
            indent=4
        )
    

    print(f"Saved full document text to {output_path}")
    
    return documents