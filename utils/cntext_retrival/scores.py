from rank_bm25 import BM25Okapi
from langchain_core.documents import Document
import numpy as np


# -----------------------------------
# Create BM25 Index
# -----------------------------------

def create_bm25_index(docs):

    tokenized_docs = [
        doc.page_content.lower().split()
        for doc in docs
    ]

    bm25 = BM25Okapi(tokenized_docs)

    return bm25


# -----------------------------------
# Hybrid Retrieval
# -----------------------------------

def retrieval_pipeline(
    vectorstore,
    bm25,
    docs,
    query
):

    # -----------------------------------
    # VECTOR SCORES
    # -----------------------------------

    vector_results = vectorstore.similarity_search_with_score(
        query,
        k=5
    )

    vector_scores = {}

    for doc, distance in vector_results:

        similarity = 1 / (1 + distance)

        vector_scores[doc.page_content] = similarity

    # -----------------------------------
    # BM25 SCORES
    # -----------------------------------

    tokenized_query = query.lower().split()

    bm25_scores = bm25.get_scores(tokenized_query)

    # -----------------------------------
    # NORMALIZE BM25
    # -----------------------------------

    bm25_scores = np.array(bm25_scores)

    bm25_scores = (
        bm25_scores - bm25_scores.min()
    ) / (
        bm25_scores.max() - bm25_scores.min() + 1e-8
    )

    # -----------------------------------
    # COMBINE SCORES
    # -----------------------------------

    scored_docs = []

    for i, doc in enumerate(docs):

        content = doc.page_content

        bm25_score = bm25_scores[i]

        vector_score = vector_scores.get(content, 0)

        final_score = (
            0.4 * bm25_score
            +
            0.6 * vector_score
        )

        scored_docs.append(
            (doc, final_score)
        )

    # -----------------------------------
    # SORT
    # -----------------------------------

    scored_docs.sort(
        key=lambda x: x[1],
        reverse=True
    )

    # -----------------------------------
    # RETURN TOP DOCS
    # -----------------------------------

    final_docs = [
        doc
        for doc, score in scored_docs[:5]
    ]

    return final_docs