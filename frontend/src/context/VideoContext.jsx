import {
   useContext,
   createContext,
   useState, useEffect
} from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {

   const [videoUrl, setVideoUrl] =
      useState("");

   const [videoData, setVideoData] =
      useState(null);

   const [videoID , setVideoID] = useState("");

   useEffect(() => {
      if (videoUrl) {
         const id = videoUrl.split("v=")[1].split("&")[0];
         setVideoID(id);
      }
   }, [videoUrl]);

   return (
      <VideoContext.Provider
         value={{
            videoUrl,
            setVideoUrl,
            videoData,
            setVideoData,
            videoID,
            setVideoID
         }}
      >
         {children}
      </VideoContext.Provider>
   );
}

export default function useVideo() {
   return useContext(VideoContext);
}