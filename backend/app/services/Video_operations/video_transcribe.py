from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound


def get_transcript(video_id):


    # Create API object
    ytt_api = YouTubeTranscriptApi()

    # Step 1: Get available transcripts

    try:
        transcript_list = ytt_api.fetch(video_id , languages=['en'])
        # Save transcript to file
        return transcript_list
        

    except (NoTranscriptFound, TranscriptsDisabled) as e:
        print(f"Error fetching transcripts because does not exist")
        return None

