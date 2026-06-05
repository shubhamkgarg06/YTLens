import { useState , useEffect} from 'react'
import Navbar from './components/navbar/Navbar'
import Chatblock from './components/chatblock/Chatblock'
import VideoBlock from './components/video/Video_Block'
import  {ThemeProvider }from "./context/ThemeContext";
import { VideoProvider } from "./context/VideoContext";
import DeveloperMode from './components/Developer/DeveloperMode';
import {ChatblockMessagesProvider} from "./context/ChatblockMessagesContext";
function App() {

  const [player, setPlayer] = useState(null);
  const [DeveloperModeEnabled, setDeveloperModeEnabled] = useState(false);

  return (

    <ThemeProvider>

      <VideoProvider>

        <div
        className={`min-h-screen h-screen flex flex-col transition-colors duration-300
          bg-white
          text-black

          dark:bg-black
          dark:text-white
        `}
      >

            <Navbar DeveloperModeEnabled={DeveloperModeEnabled} setDeveloperModeEnabled={setDeveloperModeEnabled} />


              <div className="flex-1 flex p-4 gap-4 transition-all duration-200 min-h-0"> 

                <div className={` ${DeveloperModeEnabled ? "w-1/3" : "w-3/8"} transition-all duration-200 overflow-hidden`}>
                    <VideoBlock player={player} setPlayer={setPlayer} />
                </div>

                <ChatblockMessagesProvider>

                    <div className={` ${DeveloperModeEnabled ? "w-1/3" : "w-5/8"} transition-all duration-200 overflow-hidden`}>
                        <Chatblock player={player}/>
                    </div>

                      {DeveloperModeEnabled &&
                          <div className="w-1/3 overflow-y-auto">
                            <DeveloperMode />
                          </div>
                      }

                </ChatblockMessagesProvider>

              </div>

              

        </div>

      </VideoProvider>

    </ThemeProvider>

  )
}

export default App