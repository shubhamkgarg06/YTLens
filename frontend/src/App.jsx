import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Chatblock from './components/chatblock/Chatblock'
import VideoBlock from './components/video/Video_Block'

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");

  return (

    <div
      className={`min-h-screen h-screen overflow-hidden flex flex-col transition-colors duration-300
        ${
          darkMode
            ? "bg-[rgb(9,11,17)] text-white"
            : "bg-gray-100 text-black"
        }
      `}
    >

      <Navbar darkMode={darkMode}  setDarkMode={setDarkMode} videoUrl={videoUrl} setVideoUrl={setVideoUrl}
      />

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
            
          <div className=" w-3/8">
              <VideoBlock videoUrl={videoUrl} />
          </div>
            
          <div className=" w-5/8">
              <Chatblock />
          </div>
            
      </div>

    </div>

  )
}

export default App