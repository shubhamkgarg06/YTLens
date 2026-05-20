# ---------------------------------------------------
# Timestamp Formatting Utilities
# ---------------------------------------------------

def format_timestamp(seconds):

    minutes = int(seconds // 60)

    remaining_seconds = int(seconds % 60)

    return f"{minutes}:{remaining_seconds:02d}"


def timestamp_to_seconds(timestamp):

    parts = timestamp.split(":")

    minutes = int(parts[0])
    seconds = int(parts[1])

    return minutes * 60 + seconds