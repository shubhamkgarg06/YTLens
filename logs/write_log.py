import os


# ---------------------------------------------------
# Logging Function
# ---------------------------------------------------

def write_log( question,retrieval_type,refined_question,context,final_answer):

    # Create logs directory if not exists
    os.makedirs("logs", exist_ok=True)

    log_file_path = "logs/retrieval_logs_reranking.txt"

    with open(log_file_path, "a", encoding="utf-8") as file:

        file.write("\n")
        file.write("=" * 80)
        file.write("\n\n")

        # ---------------------------------------------------
        # User Question
        # ---------------------------------------------------

        file.write("USER QUESTION:\n")
        file.write(f"{question}\n\n")

        # ---------------------------------------------------
        # Retrieval Type
        # ---------------------------------------------------

        file.write("RETRIEVAL TYPE:\n")
        file.write(f"{retrieval_type}\n\n")

        # ---------------------------------------------------
        # Refined Question
        # ---------------------------------------------------

        file.write("REFINED QUESTION:\n")

        if refined_question:
            file.write(f"{refined_question}\n\n")

        else:
            file.write("None\n\n")

        # ---------------------------------------------------
        # Retrieved Context
        # ---------------------------------------------------

        file.write("RETRIEVED CONTEXT:\n")
        file.write(f"{context}\n\n")

        # ---------------------------------------------------
        # Final Answer
        # ---------------------------------------------------

        file.write("FINAL ANSWER:\n")
        file.write(f"{final_answer}\n\n")

        file.write("=" * 80)
        file.write("\n")