import { Book } from 'lucide-react'

function VideoInfo({videoData}) {

    function formatDuration(seconds) {

        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins}m ${secs}s`;
        }

        return `${mins}m ${secs}s`;
    }

    function formatViews(num) {

        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1) + "B";
        }

        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + "M";
        }

        if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + "K";
        }

        return num.toString();
    }

    return (
        <div className="h-full bg-gray-800 rounded-lg p-2">
            <div className="flex items-center mb-2 text-sm border-b border-gray-400 p-1 gap-1">
                <Book className="inline-block mr-1 text-orange-400" />
                <h1 className="font-bold text-white">Video Info</h1>
            </div>

            {/* CONTENT */}
            <div className="space-y-2 text-md p-2 flex gap-2">

                <div className="flex flex-col gap-2">

                    <span className="text-gray-400 font-medium">
                        Title:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Channel:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Duration:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Views:
                    </span>


                </div>

                <div className="flex flex-col gap-2">

                    <span className="text-white ml-2 text-semibold">
                        {
                            videoData?.title ? (
                                <span>{videoData.title}</span>
                            ) : (
                                ""
                            )
}
                    </span>

                    <span className="text-white ml-2 text-semibold">
                        {videoData && videoData.uploader ? videoData.uploader : " "}
                    </span>

                    <span className="text-white ml-2 text-semibold">
                        {videoData && videoData.duration ? formatDuration(videoData.duration) : " "}
                    </span>

                    <span className="text-white ml-2 text-semibold  ">
                        {videoData && videoData.views ? formatViews(videoData.views) : " "}
                    </span>

                </div>


            </div>
            

        </div>
    );
}

export default VideoInfo;