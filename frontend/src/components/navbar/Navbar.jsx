import myLogo_night from "../navbar/assets/logo-bg-remove-3.png"
import myLogo_day from "../navbar/assets/logo-bg-remove-4.png"
import Developer_mode_switch from "./Developer_mode"
import Theme_toggle from "./Day-Night"
import VideoLinkBox from "./VideoLinkBox";
import useTheme  from "../../context/ThemeContext";

function Navbar() { 

  const { themeMode } = useTheme();

    return (
        <nav className={`flex items-center justify-between px-4 py-2 backdrop-blur-md shadow-lg`}>
          {/* Logo Container */}

          <img src={themeMode === "dark" ? myLogo_night : myLogo_day} alt="Logo" className="h-8 w-auto object-contain" />


          <div className="flex-1 flex justify-center px-6">
            <VideoLinkBox />
          </div>

          {/* Developer Mode */}
          <div className="flex gap-4 items-center">


            <Developer_mode_switch />

            <Theme_toggle />
            

          </div>
        </nav>

            
            
    )
}

export default Navbar
