import { useState } from "react";
import myLogo_night from "../navbar/assets/logo-bg-remove-3.png"
import myLogo_day from "../navbar/assets/logo-bg-remove-4.png"
import Developer_mode_switch from "./Developer_mode"
import Theme_toggle from "./Day-Night"
import VideoLinkBox from "./VideoLinkBox";

function Navbar({darkMode, setDarkMode , videoUrl, setVideoUrl}) { 
  

    return (
        <nav className={`flex items-center justify-between px-4 py-2 backdrop-blur-md shadow-lg`}>
          {/* Logo Container */}

          <img src={darkMode ? myLogo_night : myLogo_day} alt="Logo" className="h-8 w-auto object-contain" />


          <div className="flex-1 flex justify-center px-6">
            <VideoLinkBox darkMode = {darkMode} videoUrl = {videoUrl} setVideoUrl = {setVideoUrl}/>
          </div>

          {/* Developer Mode */}
          <div className="flex gap-4 items-center">


            <Developer_mode_switch darkMode={darkMode} />

            <Theme_toggle darkMode={darkMode} setDarkMode={setDarkMode} />
            

          </div>
        </nav>

            
            
    )
}

export default Navbar
