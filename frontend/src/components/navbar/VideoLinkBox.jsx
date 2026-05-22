import { MessageSquareCheck } from "lucide-react";
import { useState } from "react";

function VideoLinkBox({darkMode , videoUrl, setVideoUrl}) {

    const [loading, setLoading] = useState(false);
    const [inputUrl, setInputUrl] = useState(videoUrl);

    const isValidYoutubeUrl = (url) => {

        const regex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

        return regex.test(url);
    };


    const handleSubmit = () => {
        console.log(inputUrl);

        if (!isValidYoutubeUrl(inputUrl)) {
            alert("Please enter a valid YouTube URL");
            return;
        }

        setVideoUrl(inputUrl);
        setLoading(true);
        return;

        // later:
        // fetch video data here
    };

    return (
        <div className="w-full max-w-xl">
            <div className={`
                flex items-center
                border 
                rounded-2xl
                px-3 py-1
                shadow-lg
                transition-all duration-300
                focus-within:border-red-500
                focus-within:shadow-red-500/20
                focus-within:shadow-xl
                ${darkMode ? " bg-[#111827]/90 border-white/20" : "text-black  bg-gray-200 border-black/20"}

            `}>

                <input
                    type="text"
                    placeholder="Paste YouTube video URL..."
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className={`
                        flex-1
                        bg-transparent
                        outline-none
                        text-sm
                        px-2
                        ${darkMode ? "text-white placeholder-gray-500" : "text-black placeholder-gray-800"}
                        disabled:cursor-not-allowed
                    `}
                    disabled={loading}
                />

                <button
                    className="
                        bg-red-600
                        hover:bg-white
                        active:scale-95
                        text-white
                        hover:text-red-600
                        p-2.5
                        rounded-xl
                        transition-all duration-200
                        shadow-md
                        disabled:cursor-not-allowed
                    "
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    <MessageSquareCheck size={16} />
                </button>
            </div>
        </div>
    );
}

export default VideoLinkBox;