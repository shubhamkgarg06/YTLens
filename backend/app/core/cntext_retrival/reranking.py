from rank_bm25 import BM25Okapi
from app.utils.get_video_folder import get_video_folder

from app.core.cntext_retrival.Storing_scores.storing_retrival_scores import store_scores
import pickle
import os

# =====================================================
# CREATE BM25 INDEX
# =====================================================

def create_bm25_index(docs , video_id):

    video_folder = get_video_folder(video_id)
    
    if os.path.exists(video_folder / "bm25.pkl"):

        print(f"BM25 index already exists for video ID {video_id}. Loading existing index.")

        with open(video_folder / "bm25.pkl", "rb") as f:

            bm25 = pickle.load(f)

        return bm25


    tokenized_docs = [
        doc.page_content.lower().split()
        for doc in docs
    ]

    bm25 = BM25Okapi(tokenized_docs)
    
    
    
    with open(video_folder / "bm25.pkl","wb" ) as f:
        pickle.dump(bm25, f)

    return bm25









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
    top_k_rrf=10
):


    #---------------------------------------------------------
    # Creating a Dictionary to store scores
    #---------------------------------------------------------

    scores = {}

    # -------------------------------------------------
    # STEP 1 -> VECTOR RETRIEVAL
    # -------------------------------------------------

    vector_results = vectorstore.similarity_search_with_score(
        query,
        k=top_k_vector
    )

    scores = store_scores(vector_results , scores , "vector")

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

    scores = store_scores(bm25_doc_scores[:top_k_bm25] , scores , "BM25")

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

        chunk_id = doc.metadata["chunk_index"]

        rrf_scores[chunk_id] = (
            rrf_scores.get(chunk_id, 0)
            +
            rrf_score(rank)
        )


    # BM25 ranks
    for rank, doc in enumerate(
        bm25_ranked_docs,
        start=1
    ):

        chunk_id = doc.metadata["chunk_index"]

        rrf_scores[chunk_id] = (
            rrf_scores.get(chunk_id, 0)
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

    chunkid_to_doc = {
        doc.metadata["chunk_index"]: doc
        for doc in docs
    }

    retrieved_docs = [
        chunkid_to_doc[chunk_id]
        for chunk_id, score
        in rrf_ranked_docs[:top_k_rrf]
    ]

    retrived_rrf_scores = [
        (chunkid_to_doc[chunk_id] , score)
        for chunk_id, score
        in rrf_ranked_docs[:top_k_rrf]
    ]

    scores = store_scores(retrived_rrf_scores , scores , "rrf")


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

    scores = store_scores(reranked_docs , scores , "reranking")


    # -------------------------------------------------
    # STEP 9 -> FINAL TOP DOCS
    # -------------------------------------------------

    if not reranked_docs:
        return [[], {"scores": scores, "threshold": {}}]

    best_score = reranked_docs[0][1]

    final_docs = [
        doc
        for doc, score in reranked_docs
        if score >= best_score * 0.8
    ]


    #---------------------------------------------------------
    # Storing the thresholds for each type of retrival
    #---------------------------------------------------------

    thresholds = {
        "vector" : f"{top_k_vector} chunks",
        "bm25" : f"{top_k_bm25} chunks",
        "rrf" : f"{top_k_rrf} chunks",
        "reranking" : " > best * 0.8"
    }


    retrival = {
        "scores" : scores,
        "threshold" : thresholds
    }




    return [final_docs , retrival]