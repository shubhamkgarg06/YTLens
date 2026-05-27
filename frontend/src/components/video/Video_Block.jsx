import VideoPlayer from './Video_Player.jsx'
import VideoInfo from './VideoInfo.jsx'
import VideoChapters from './Video_Chapters.jsx'
import { useState } from 'react';
import useVideo from "../../context/VideoContext";

function VideoBlock() {

    const { videoUrl, videoData } = useVideo();
    const [player, setPlayer] = useState(null);

    return (
        <div className="flex flex-col w-full h-full gap-2 overflow-hidden"> 

                <div className="h-1/3">
                    <VideoPlayer setPlayer={setPlayer} />
                </div>

                <div className="h-1/3">
                    <VideoInfo />
                </div>

                <div className="h-1/3">
                    <VideoChapters player={player} />
                </div>

        </div>
 
    );
}

export default VideoBlock;