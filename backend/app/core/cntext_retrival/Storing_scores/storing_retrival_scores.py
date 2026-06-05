

def store_scores(results , final_scores , score_type):

    print(score_type)
    for doc,score in results:

        
        chunk_id = doc.metadata["chunk_index"]
        final_scores.setdefault(score_type , {})
        final_scores[score_type][chunk_id] = float(score)
        print(f"{chunk_id}  ->  {score} -> {type(score)} \n" )
    

    print("\n\n")
    

    return final_scores
    

