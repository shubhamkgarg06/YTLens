from utils.timestamp_utils import format_timestamp

# ---------------------------------------------------
# Timestamp-Based Retrieval
# ---------------------------------------------------

def get_relevant_docs_by_timestamp(documents, start_time, end_time):

    relevant_docs = []

    for doc in documents:

        doc_start = doc.metadata["start_time"]
        doc_end = doc.metadata["end_time"]

        # Standard overlap condition
        if doc_start <= end_time and doc_end >= start_time:

            relevant_docs.append(doc)

    return relevant_docs


# ---------------------------------------------------
# Context Builder
# ---------------------------------------------------

def build_context_from_docs(docs):

    context = ""

    for doc in docs:

        start = format_timestamp(doc.metadata["start_time"])
        end = format_timestamp(doc.metadata["end_time"])

        context += f"""
[{start} → {end}]

{doc.page_content}

"""

    return context