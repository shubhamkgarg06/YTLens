import json
import os

from backend.Evaluation_metric.calculating.prec import calculate_precision
from backend.Evaluation_metric.calculating.recall import calculate_recall
from backend.Evaluation_metric.calculating.hit_rate import calculate_hit_rate
from backend.Evaluation_metric.calculating.mrr import calculate_mean_reciprocal_rank
from backend.Evaluation_metric.calculating.f1 import calculate_f1_score


def store_metrics(query , precision, recall, hit_rate, mrr, f1, video_id="kqtD5dpn9C8"):

    current_dir = os.path.dirname(__file__)
    base_dir = os.path.dirname(current_dir)

    output_path = os.path.join(
        base_dir,
        "data",
        video_id,
        "evaluation_metrics.json"
    )

    # Create folder if it doesn't exist
    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    existing_data = []


    if os.path.exists(output_path):

        with open(output_path, "r", encoding="utf-8") as f:

            existing_data = json.load(f)


    existing_data.append(
        {
            "qyuery": query,
            "precision": precision,
            "recall": recall,
            "hit_rate": hit_rate,
            "mrr": mrr,
            "f1": f1
        }
    )

    with open(output_path, "w", encoding="utf-8") as f:

        json.dump(
            existing_data,
            f,
            indent=4,
            ensure_ascii=False
        )


def calculate_metrics(video_id="kqtD5dpn9C8"):

    current_dir = os.path.dirname(__file__)
    base_dir = os.path.dirname(current_dir)

    ground_truth_path = os.path.join(
        current_dir,
        "sample_test.json"
    )

    retrieval_results_path = os.path.join(
        base_dir,
        "data",
        video_id,
        "retrieval_results.json"
    )

    if not os.path.exists(ground_truth_path):
        print("Ground truth file not found.")
        return
    
    if not os.path.exists(retrieval_results_path):
        print("Retrieval results file not found.")
        return   

    with open(ground_truth_path, "r") as f:

        ground_truth = json.load(f)


    with open(retrieval_results_path, "r") as f:

        retrieved_results = json.load(f)

    precision_scores = []
    recall_scores = []
    hit_rates = []
    mrr_scores = []
    f1_scores = []

    sample_lookup = {

        item["query"]: item["relevant_chunks"]

        for item in ground_truth
    }

    for item in retrieved_results:

        query = item["query"]
        retrieved_chunks = item["retrieved_chunks"]

        if query in sample_lookup:
            relevant_chunks = sample_lookup[query]
            precision = calculate_precision(relevant_chunks, retrieved_chunks)
            precision_scores.append(precision)
            recall = calculate_recall(relevant_chunks, retrieved_chunks)
            recall_scores.append(recall)
            hit_rate = calculate_hit_rate(relevant_chunks, retrieved_chunks)
            hit_rates.append(hit_rate)
            mrr = calculate_mean_reciprocal_rank(relevant_chunks, retrieved_chunks)
            mrr_scores.append(mrr)
            f1 = calculate_f1_score(precision, recall)
            f1_scores.append(f1)

            store_metrics( query ,precision , recall , hit_rate , mrr , f1 , video_id)

    print("\nPrecision Scores:\n", precision_scores)
    print("\n\nRecall Scores:\n\n", recall_scores)
    print("\n\nHit Rates:\n\n", hit_rates)
    print("\n\nMRR Scores:\n\n", mrr_scores)
    print("\n\nF1 Scores:\n\n", f1_scores)



calculate_metrics()