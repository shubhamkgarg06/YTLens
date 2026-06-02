import myLogo_night from "../navbar/assets/logo-bg-remove-3.png";
import myLogo_day from "../navbar/assets/logo-bg-remove-4.png";
import Developer_mode_switch from "./Developer_mode";
import Theme_toggle from "./Day-Night";
import VideoLinkBox from "./VideoLinkBox";
import useTheme from "../../context/ThemeContext";
import { motion } from "framer-motion";

function Navbar({ DeveloperModeEnabled, setDeveloperModeEnabled }) {
  const { themeMode } = useTheme();

  return (
    <nav
      className={"sticky top-0 z-50 flex items-center justify-between px-4 py-2 backdrop-blur-md shadow-lg"}
    >
      {/* Logo */}
      <div>
        <img
          src={themeMode === "dark" ? myLogo_night : myLogo_day}
          alt="Logo"
          className="h-8 w-auto object-contain"
        />
      </div>


      {/* Video Input */}
      <div
        
        className={"absolute inset-0 flex items-center justify-center"}
      >
        <VideoLinkBox />
      </div>

      {/* Right Controls */}
      <div
        className={"flex gap-4 items-center px-4 py-2"}
      >
        <Developer_mode_switch DeveloperModeEnabled={DeveloperModeEnabled} setDeveloperModeEnabled={setDeveloperModeEnabled} />
        <Theme_toggle />
      </div>
    </nav>
  );
}

export default Navbar;