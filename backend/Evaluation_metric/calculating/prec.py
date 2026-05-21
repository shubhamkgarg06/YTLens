def calculate_precision(relevant_chunks, retrieved_chunks):
    if not retrieved_chunks:
        return 0.0

    # set.intersection handles different lengths automatically
    true_positives = set(retrieved_chunks).intersection(relevant_chunks)
    
    # len() on a set always returns a normal Python int
    equal_count = len(true_positives)

    return equal_count / len(retrieved_chunks)