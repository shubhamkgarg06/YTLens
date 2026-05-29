from app.utils.timestamp_utils import timestamp_to_seconds
import re

# ---------------------------------------------------
# Regex Timestamp Extraction
# ---------------------------------------------------

def regex_timestamp_parser(query):

    pattern = r"\b\d{1,2}:\d{2}\b"

    matches = re.findall(pattern, query)
    
    print(f"\nRegex matches found in query: {matches}\n")
    
    if len(matches) >= 2:

        start_time = timestamp_to_seconds(matches[0])
        end_time = timestamp_to_seconds(matches[1])

        return {
            "found": True,
            "start": start_time,
            "end": end_time
        }

    return {
        "found": False
    }