import VideoPlayer from './Video_Player.jsx'
import VideoInfo from './VideoInfo.jsx'
import VideoChapters from './Video_Chapters.jsx'
import { useState } from 'react';

function VideoBlock({ videoUrl , videoData}) {

    const [player, setPlayer] = useState(null);

    return (
        <div className="flex flex-col w-full h-full gap-2"> 

                <div className="h-1/3">
                    <VideoPlayer videoUrl={videoUrl} setPlayer={setPlayer} />
                </div>

                <div className="h-1/3">
                    <VideoInfo videoData={videoData}  />
                </div>

                <div className="h-1/3">
                    <VideoChapters videoData={videoData} player={player}/>
                </div>

        </div>
 
    );
}

export default VideoBlock;