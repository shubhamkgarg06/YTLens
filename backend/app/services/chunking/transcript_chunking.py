from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_transcript(transcript):

    if transcript:
        return chunk_transcript(transcript)
    else:
        return None


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100,
    length_function=len
)

def chunk_transcript(transcript):
    return text_splitter.split_text(transcript)
