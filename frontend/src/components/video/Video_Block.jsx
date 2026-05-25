import VideoPlayer from './Video_Player.jsx'
import VideoInfo from './VideoInfo.jsx'
import VideoChapters from './Video_Chapters.jsx'
import { useState } from 'react';

function VideoBlock({ videoUrl , videoData , darkMode }) {

    const [player, setPlayer] = useState(null);

    return (
        <div className="flex flex-col w-full h-full gap-2 overflow-hidden"> 

                <div className="h-1/3">
                    <VideoPlayer videoUrl={videoUrl} setPlayer={setPlayer} darkMode={darkMode} />
                </div>

                <div className="h-1/3">
                    <VideoInfo videoData={videoData} darkMode={darkMode} />
                </div>

                <div className="h-1/3">
                    <VideoChapters videoData={videoData} player={player} darkMode={darkMode}/>
                </div>

        </div>
 
    );
}

export default VideoBlock;