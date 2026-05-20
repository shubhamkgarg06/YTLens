from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser

from prompts.answer_prompt import main_workflow_prompt
from prompts.reformulation_prompt import query_reformulation_prompt
from prompts.timestamp_prompt import timestamp_extraction_prompt


from utils.regex_timestamp_utils import regex_timestamp_parser
from utils.context_build_utils import build_context_from_docs , get_relevant_docs_by_timestamp
from utils.answer_utils import generate_answer
# from utils.respective_cntext_retrival import retrieval_pipeline , create_retrievers
# from utils.cntext_retrival.hybrid import retrieval_pipeline , create_retrievers
# from utils.cntext_retrival.scores import create_bm25_index, retrieval_pipeline
from utils.cntext_retrival.reranking import create_bm25_index, retrieval_pipeline , load_reranker

from logs.write_log import write_log

from Evaluation_metric.store_results import export_results_to_json


def main_chat_workflow(vector_store, documents , video_id):

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
    )

    str_output_parser = StrOutputParser()

    # ---------------------------------------------------
    # Retrivals
    # ---------------------------------------------------

    bm25_retriever = create_bm25_index(documents)
    reranker = load_reranker()

    # ---------------------------------------------------
    # Chains
    # ---------------------------------------------------

    chain = (
        main_workflow_prompt
        | llm
        | str_output_parser
    )

    query_reformulation_chain = (
        query_reformulation_prompt
        | llm
        | str_output_parser
    )

    timestamp_extraction_chain = (
        timestamp_extraction_prompt
        | llm
        | str_output_parser
    )


    # ---------------------------------------------------
    # Chat History
    # ---------------------------------------------------

    chat_history = []


    # ---------------------------------------------------
    # Time-related Keywords
    # ---------------------------------------------------

    time_keywords = [
        "minute",
        "minutes",
        "timestamp",
        "section",
        "part",
        "around",
        "time"
    ]


    # ---------------------------------------------------
    # MAIN LOOP
    # ---------------------------------------------------

    while True:

        user_question = input("\nPlease enter your question: ")

        if user_question.lower() == "exit":
            break


        # =================================================
        # STEP 1 -> REGEX TIMESTAMP DETECTION
        # =================================================

        timestamp_info = regex_timestamp_parser(user_question)

        if timestamp_info["found"]:

            start_time = timestamp_info["start"]
            end_time = timestamp_info["end"]

            relevant_docs = get_relevant_docs_by_timestamp(
                documents,
                start_time,
                end_time
            )

            if relevant_docs:

                context = build_context_from_docs(relevant_docs)

                result = generate_answer(
                    chain,
                    user_question,
                    context,
                    chat_history
                )

                print("\n\nAnswer:\n")
                print(result)

                write_log(
                    question=user_question,
                    retrieval_type="regex_timestamp",
                    refined_question=None,
                    context=context,
                    final_answer=result
                )

                continue


        # =================================================
        # STEP 2 -> LLM TIMESTAMP EXTRACTION
        # =================================================

        should_try_llm_timestamp = any(
            keyword in user_question.lower()
            for keyword in time_keywords
        )

        if should_try_llm_timestamp:

            llm_timestamp_response = timestamp_extraction_chain.invoke({
                "query": user_question
            })

            if llm_timestamp_response.strip().upper() != "NONE":

                try:

                    start_str, end_str = llm_timestamp_response.split(",")

                    start_time = int(start_str.strip())
                    end_time = int(end_str.strip())

                    relevant_docs = get_relevant_docs_by_timestamp(
                        documents,
                        start_time,
                        end_time
                    )

                    if relevant_docs:

                        context = build_context_from_docs(relevant_docs)

                        result = generate_answer(
                            chain,
                            user_question,
                            context,
                            chat_history
                        )

                        print("\n\nAnswer:\n")
                        print(result)

                        write_log(
                            question=user_question,
                            retrieval_type="llm_timestamp",
                            refined_question=None,
                            context=context,
                            final_answer=result
                        )

                        continue

                except Exception:

                    print("\nCould not parse timestamp response.\n")


        # =================================================
        # STEP 3 -> QUERY REFORMULATION
        # =================================================

        refined_question = query_reformulation_chain.invoke({
            "question": user_question,
            "chat_history": chat_history
        })

        print("\nRefined Question:\n")
        print(refined_question)


        # =================================================
        # STEP 4 -> SEMANTIC RETRIEVAL
        # =================================================

        docs = retrieval_pipeline(vector_store, bm25_retriever, reranker , documents, refined_question)


        # //Storing in json file for analysis
        export_results_to_json(docs, video_id, user_question)



        # =================================================
        # STEP 5 -> BUILD CONTEXT
        # =================================================

        context = build_context_from_docs(docs)


        # =================================================
        # STEP 6 -> GENERATE FINAL ANSWER
        # =================================================

        result = generate_answer(
            chain,
            user_question,
            context,
            chat_history
        ) 

        print("\n\nAnswer:\n")
        print(result)

        write_log(
            question=user_question,
            retrieval_type="semantic_retrieval",
            refined_question=refined_question,
            context=context,
            final_answer=result
        )

