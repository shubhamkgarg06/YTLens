import {
   useContext,
   createContext,
   useState
} from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {

   const [videoUrl, setVideoUrl] =
      useState("");

   const [videoData, setVideoData] =
      useState(null);

   return (
      <VideoContext.Provider
         value={{
            videoUrl,
            setVideoUrl,
            videoData,
            setVideoData
         }}
      >
         {children}
      </VideoContext.Provider>
   );
}

export default function useVideo() {
   return useContext(VideoContext);
}