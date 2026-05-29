import myLogo_night from "../navbar/assets/logo-bg-remove-3.png";
import myLogo_day from "../navbar/assets/logo-bg-remove-4.png";
import Developer_mode_switch from "./Developer_mode";
import Theme_toggle from "./Day-Night";
import VideoLinkBox from "./VideoLinkBox";
import useTheme from "../../context/ThemeContext";

function Navbar({ videoLinkVerified, setVideoLinkVerified }) {
  const { themeMode } = useTheme();

  return (
    <nav
      className={
        videoLinkVerified
          ? "sticky top-0 z-50 flex items-center justify-between px-4 py-2 backdrop-blur-md shadow-lg"
          : "relative h-screen"
      }
    >
      {/* Logo */}
      <div
        className={
          videoLinkVerified
            ? ""
            : "absolute top-4 left-4"
        }
      >
        <img
          src={themeMode === "dark" ? myLogo_night : myLogo_day}
          alt="Logo"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* Video Input */}
      <div
        className={
          videoLinkVerified
            ? "flex-1 flex justify-center" 
            : "absolute inset-0 flex items-center justify-center"
        }
      >
        <VideoLinkBox videoLinkVerified={videoLinkVerified} setVideoLinkVerified={setVideoLinkVerified} />
      </div>

      {/* Right Controls */}
      <div
        className={
          videoLinkVerified
            ? "flex gap-4 items-center px-4 py-2"
            : "absolute top-4 right-4 flex gap-4 items-center"
        }
      >
        <Developer_mode_switch />
        <Theme_toggle />
      </div>
    </nav>
  );
}

export default Navbar;