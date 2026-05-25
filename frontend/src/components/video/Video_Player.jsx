import YouTube from "react-youtube";

function VideoPlayer({ videoUrl , setPlayer , darkMode }) {

    function extractVideoId(url) {

        if (!url) return null;

        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url;
        }

        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        const match = url.match(regExp);

        return match ? match[2] : null;
    }

    const onReady = (event) => {

        setPlayer(event.target);

    };

    const videoId = extractVideoId(videoUrl);

    console.log("VIDEO URL:", videoUrl);
    console.log("VIDEO ID:", videoId);

    return (

        <div className={`h-full rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>

            {
                videoId ? ( 

                    <YouTube

                        videoId={videoId}

                        iframeClassName="w-full h-full rounded-lg"

                        className= "h-full p-1 rounded-lg"

                        onReady={onReady}

                        opts={{
                            width: "100%",
                            height: "100%",
                            playerVars: {
                                autoplay: 0,
                                rel: 0,
                            },
                        }}
                    />
                ) :
                (
                    <div className={`h-full w-full flex items-center justify-center ${darkMode ? 'text-gray-500' : 'text-gray-800'}`}>
                        No video loaded
                    </div>
                )
            }

        </div>
    );
}

export default VideoPlayer;