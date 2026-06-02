# ---------------------------------------------------
# Timestamp Formatting Utilities
# ---------------------------------------------------

def timestamp_to_seconds(timestamp):

    parts = timestamp.split(":")

    minutes = int(parts[0])
    seconds = int(parts[1])

    return minutes * 60 + seconds