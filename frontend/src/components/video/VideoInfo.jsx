import { Book } from 'lucide-react'
import useVideo from "../../context/VideoContext";

function VideoInfo() {

    const { videoData } = useVideo();

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
        <div className="h-full rounded-xl 
         bg-gray-300 dark:bg-gray-800 
         p-2 overflow-hidden shadow-sm">

         {/* HEADER */}
         <div className="
             flex items-center gap-1
             border-b border-gray-400/40
             pb-2 mb-2
         ">
             <Book className="text-orange-400 w-5 h-5" />

             <h1 className="
                 text-lg font-semibold
                 text-gray-900 dark:text-white
             ">
                 Video Info
             </h1>
         </div>

         {/* CONTENT */}
         <div className="
             grid grid-cols-[90px_1fr]
             gap-y-3 gap-x-1
             text-sm
         ">

             {/* TITLE */}
             <span className="
                 font-medium
                 text-gray-600 dark:text-gray-400
             ">
                 Title
             </span>

             <span className="
                 font-semibold
                 text-gray-900 dark:text-white
                 break-words leading-relaxed
             ">
                 {videoData?.title || "-"}
             </span>

             {/* CHANNEL */}
             <span className="
                 font-medium
                 text-gray-600 dark:text-gray-400
             ">
                 Channel
             </span>

             <span className="
                 font-semibold
                 text-gray-900 dark:text-white
             ">
                 {videoData?.uploader || "-"}
             </span>

             {/* DURATION */}
             <span className="
                 font-medium
                 text-gray-600 dark:text-gray-400
             ">
                 Duration
             </span>

             <span className="
                 font-semibold
                 text-gray-900 dark:text-white
             ">
                 {videoData?.duration
                     ? formatDuration(videoData.duration)
                     : "-"}
             </span>

             {/* VIEWS */}
             <span className="
                 font-medium
                 text-gray-600 dark:text-gray-400
             ">
                 Views
             </span>

             <span className="
                 font-semibold
                 text-gray-900 dark:text-white
             ">
                 {videoData?.views
                     ? formatViews(videoData.views)
                     : "-"}
             </span>

         </div>
             </div>
         );
}

export default VideoInfo;