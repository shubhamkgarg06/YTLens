def calculate_mean_reciprocal_rank(
    relevant_chunks,
    retrieved_chunks
):

    for idx, chunk in enumerate(
        retrieved_chunks,
        start=1
    ):

        if chunk in relevant_chunks:

            return 1 / idx

    return 0