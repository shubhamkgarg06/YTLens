import VideoPlayer from './Video_Player.jsx'
import VideoInfo from './VideoInfo.jsx'
import VideoChapters from './Video_Chapters.jsx'

function VideoBlock({ videoUrl }) {

    videoUrl = `https://www.youtube.com/embed/${videoUrl.split('v=')[1]}`

    return (
        <div className="flex flex-col w-full h-full gap-2"> 

                <div className="h-1/3">
                    <VideoPlayer videoUrl={videoUrl} />
                </div>

                <div className="h-1/3">
                    <VideoInfo />
                </div>

                <div className="h-1/3">
                    <VideoChapters />
                </div>

        </div>
 
    );
}

export default VideoBlock;