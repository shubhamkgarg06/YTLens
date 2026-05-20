from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

# video_id = "1bUy-1hGZpI"

def get_transcript(video_id):


    # Create API object
    ytt_api = YouTubeTranscriptApi()

    # Step 1: Get available transcripts

    try:
        transcript_list = ytt_api.fetch(video_id , languages=['en'])

        

        # print(transcript_list)

        # transcript = ""

        # for item in transcript_list:
            # transcript += item.text + " "

        # print("Transcript fetched successfully:\n\n")
        # print(transcript)
        return transcript_list

    except (NoTranscriptFound, TranscriptsDisabled) as e:
        print(f"Error fetching transcripts because does not exist")
        return None

# get_transcript(video_id)