import VideoPlayer from './Video_Player.jsx'
import VideoInfo from './VideoInfo.jsx'
import VideoChapters from './Video_Chapters.jsx'

function VideoBlock({player , setPlayer}) {

    

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