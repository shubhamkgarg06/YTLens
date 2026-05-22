function VideoPlayer({ videoUrl }) {
    return (
        <div className="h-full bg-gray-800 rounded-lg p-1">

            <iframe
                className=" h-full w-full rounded-sm"
                src={videoUrl}
                title="YouTube video player"
                allowFullScreen
            />

        </div>
    );
}

export default VideoPlayer;