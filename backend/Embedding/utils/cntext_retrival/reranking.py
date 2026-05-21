from rank_bm25 import BM25Okapi
from sentence_transformers import CrossEncoder


# =====================================================
# CREATE BM25 INDEX
# =====================================================

def create_bm25_index(docs):

    tokenized_docs = [
        doc.page_content.lower().split()
        for doc in docs
    ]

    bm25 = BM25Okapi(tokenized_docs)

    return bm25


# =====================================================
# LOAD RERANKER
# =====================================================

def load_reranker():

    reranker = CrossEncoder(
        "BAAI/bge-reranker-base"
    )

    return reranker


# =====================================================
# RRF SCORE FUNCTION
# =====================================================

def rrf_score(rank, k=60):

    return 1 / (k + rank)


# =====================================================
# HYBRID RETRIEVAL + RRF + RERANKING
# =====================================================

def retrieval_pipeline(
    vectorstore,
    bm25,
    reranker,
    docs,
    query,
    top_k_vector=10,
    top_k_bm25=10,
    top_k_rrf=10,
    score_threshold=0.75
):

    # -------------------------------------------------
    # STEP 1 -> VECTOR RETRIEVAL
    # -------------------------------------------------

    vector_results = vectorstore.similarity_search_with_score(
        query,
        k=top_k_vector
    )

    vector_ranked_docs = [
        doc
        for doc, score in vector_results
    ]


    # -------------------------------------------------
    # STEP 2 -> BM25 RETRIEVAL
    # -------------------------------------------------

    tokenized_query = query.lower().split()

    bm25_scores = bm25.get_scores(
        tokenized_query
    )

    bm25_doc_scores = list(
        zip(docs, bm25_scores)
    )

    bm25_doc_scores.sort(
        key=lambda x: x[1],
        reverse=True
    )

    bm25_ranked_docs = [
        doc
        for doc, score in bm25_doc_scores[:top_k_bm25]
    ]


    # -------------------------------------------------
    # STEP 3 -> RRF FUSION
    # -------------------------------------------------

    rrf_scores = {}


    # Vector ranks
    for rank, doc in enumerate(
        vector_ranked_docs,
        start=1
    ):

        content = doc.page_content

        rrf_scores[content] = (
            rrf_scores.get(content, 0)
            +
            rrf_score(rank)
        )


    # BM25 ranks
    for rank, doc in enumerate(
        bm25_ranked_docs,
        start=1
    ):

        content = doc.page_content

        rrf_scores[content] = (
            rrf_scores.get(content, 0)
            +
            rrf_score(rank)
        )


    # -------------------------------------------------
    # STEP 4 -> SORT RRF RESULTS
    # -------------------------------------------------

    rrf_ranked_docs = sorted(
        rrf_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )


    # -------------------------------------------------
    # STEP 5 -> GET TOP RRF DOCS
    # -------------------------------------------------

    content_to_doc = {
        doc.page_content: doc
        for doc in docs
    }

    retrieved_docs = [
        content_to_doc[content]
        for content, score
        in rrf_ranked_docs[:top_k_rrf]
    ]


    # -------------------------------------------------
    # STEP 6 -> PREPARE RERANKER INPUTS
    # -------------------------------------------------

    reranker_inputs = [
        (query, doc.page_content)
        for doc in retrieved_docs
    ]


    # -------------------------------------------------
    # STEP 7 -> RERANKER SCORES
    # -------------------------------------------------

    reranker_scores = reranker.predict(
        reranker_inputs
    )


    # -------------------------------------------------
    # STEP 8 -> FINAL RERANKING
    # -------------------------------------------------

    reranked_docs = list(
        zip(retrieved_docs, reranker_scores)
    )

    reranked_docs.sort(
        key=lambda x: x[1],
        reverse=True
    )


    # -------------------------------------------------
    # STEP 9 -> FINAL TOP DOCS
    # -------------------------------------------------

    final_docs = [
        doc
        for doc, score in reranked_docs
        if score >= score_threshold
    ]

    if not final_docs:

        final_docs = [
            reranked_docs[0][0]
        ]

    return final_docs