def calculate_recall(relevant_chunks, retrieved_chunks):
    """
    Calculate Recall.

    Recall = (Number of Relevant Documents Retrieved) / (Total Number of Relevant Documents)

    Args:
        relevant_chunks (list): List of relevant document IDs.
        retrieved_chunks (list): List of retrieved document IDs.

    Returns:
        float: Recall value.
    """
    if not relevant_chunks:
        return 0.0

    equal_count = len(set(retrieved_chunks).intersection(relevant_chunks))

    return equal_count / len(relevant_chunks) if relevant_chunks else 0.0