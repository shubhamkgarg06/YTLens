import { MessageSquareMore } from 'lucide-react';
import { useState, useEffect , useRef } from 'react';
import useVideo from '../../context/VideoContext';

function VideoChapters({player}) {
    
    const { videoData} = useVideo();


    const chapters = videoData?.chapters || [];

    const [activeChapter, setActiveChapter] = useState(0);

    const chapterRefs = useRef([]);

    // TRACK CURRENT VIDEO TIME
    useEffect(() => {

        if (!player || chapters.length === 0) return;

        const interval = setInterval(() => {

            const currentTime = player.getCurrentTime();

            // CURRENT ACTIVE CHAPTER
            const currentChapter = chapters[activeChapter];

            // STILL INSIDE CURRENT CHAPTER
            if (
                currentChapter &&
                currentTime >= currentChapter.start_time &&
                currentTime < currentChapter.end_time
            ) {
                return;
            }

            // VIDEO MOVED FORWARD
            if (currentChapter && currentTime >= currentChapter.end_time) {

                for (let i = activeChapter + 1; i < chapters.length; i++) {

                    const chapter = chapters[i];

                    if (
                        currentTime >= chapter.start_time &&
                        currentTime < chapter.end_time
                    ) {

                        setActiveChapter(prev =>
                            prev !== i ? i : prev
                        );

                        break;
                    }
                }
            }

            // VIDEO MOVED BACKWARD
            else if (
                currentChapter &&
                currentTime < currentChapter.start_time
            ) {

                for (let i = activeChapter - 1; i >= 0; i--) {

                    const chapter = chapters[i];

                    if (
                        currentTime >= chapter.start_time &&
                        currentTime < chapter.end_time
                    ) {

                        setActiveChapter(prev =>
                            prev !== i ? i : prev
                        );

                        break;
                    }
                }
            }

        }, 1000);

        return () => clearInterval(interval);

    }, [player, chapters, activeChapter]);

    // AUTO SCROLL TO ACTIVE CHAPTER
    useEffect(() => {

        const activeElement =
            chapterRefs.current[activeChapter];

        if (activeElement) {

            activeElement.scrollIntoView({

                behavior: "smooth",

                block: "center",
            });
        }

    }, [activeChapter]);



    function formatDuration(seconds) {

        const hrs = Math.floor(seconds / 3600);

        const mins = Math.floor((seconds % 3600) / 60);

        const secs = Math.floor(seconds % 60);

        const paddedMins = String(mins).padStart(2, "0");

        const paddedSecs = String(secs).padStart(2, "0");

        if (hrs > 0) {

            const paddedHrs = String(hrs).padStart(2, "0");

            return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
        }

        return `${paddedMins}:${paddedSecs}`;
    }



    return (

        <div className={`h-full flex flex-col dark:bg-gray-800  bg-gray-300 rounded-lg p-1`}>

            <div className="flex items-center mb-2 text-sm border-b border-gray-400 p-1 gap-1">

                <MessageSquareMore
                    className="inline-block mr-1 text-orange-400"
                />

                <h1 className={`font-bold dark:text-white text-gray-800`}>
                    Chapters / Key Moments
                </h1>

            </div>



            <div className="flex-1 text-sm p-1 overflow-y-auto">

                {
                    chapters.map((chapter, i) => (

                        <div

                            // STORE DOM REFERENCE
                            ref={(el) =>
                                chapterRefs.current[i] = el
                            }

                            key={chapter.start_time}

                            onClick={() => {

                                player?.seekTo(chapter.start_time);

                                player?.playVideo();
                            }}

                            className={`
                                flex items-center
                                gap-3
                                p-1
                                rounded-lg
                                cursor-pointer
                                transition-all duration-200

                                ${
                                    activeChapter === i

                                        ? `font-bold dark:text-white text-gray-800`

                                        : `hover:bg-white/5 dark:text-gray-400 text-gray-800`
                                }

                            `}
                        >

                            <span>

                                {
                                    `${formatDuration(chapter.start_time)} - ${formatDuration(chapter.end_time)}`
                                }

                            </span>

                            <span className="flex-1">

                                {chapter.title}

                            </span>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default VideoChapters;