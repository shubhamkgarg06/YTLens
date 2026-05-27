import { useState , useEffect} from 'react'
import Navbar from './components/navbar/Navbar'
import Chatblock from './components/chatblock/Chatblock'
import VideoBlock from './components/video/Video_Block'
import  {ThemeProvider }from "./context/ThemeContext";
import { VideoProvider } from "./context/VideoContext";
import useTheme from './context/ThemeContext';

function App() {

  return (

    <ThemeProvider>

      <VideoProvider>

        <div
        className={`min-h-screen h-screen overflow-hidden flex flex-col transition-colors duration-300
          bg-white
          text-black

          dark:bg-black
          dark:text-white
        `}
      >

            <Navbar/>

            <div className="flex-1 flex p-4 gap-4 overflow-hidden">

              <div className=" w-3/8">
                  <VideoBlock/>
              </div>

              <div className=" w-5/8">
                  <Chatblock/>
              </div>

            </div>

        </div>

      </VideoProvider>

    </ThemeProvider>

  )
}

export default App