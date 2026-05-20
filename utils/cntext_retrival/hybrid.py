from langchain_community.retrievers import BM25Retriever

# -----------------------------------
# Create Retrievers Once
# -----------------------------------

def create_retrievers(vectorstore, docs):

    vector_retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": 3,
            "fetch_k": 6
        }
    )

    bm25_retriever = BM25Retriever.from_documents(docs)

    bm25_retriever.k = 3

    return vector_retriever, bm25_retriever


# -----------------------------------
# Retrieval Pipeline
# -----------------------------------

def retrieval_pipeline(vector_retriever, bm25_retriever, query):

    bm25_results = bm25_retriever.invoke(query)

    vector_results = vector_retriever.invoke(query)

    combined_results = bm25_results + vector_results

    unique_docs = []

    seen = set()

    for doc in combined_results:

        if doc.page_content not in seen:

            unique_docs.append(doc)

            seen.add(doc.page_content)

    return unique_docs