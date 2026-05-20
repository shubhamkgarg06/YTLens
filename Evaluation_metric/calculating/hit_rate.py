def calculate_hit_rate(relevant_chunks, retrieved_chunks):

    common = (
        set(relevant_chunks)
        &
        set(retrieved_chunks)
    )

    return 1 if len(common) > 0 else 0