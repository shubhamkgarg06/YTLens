import { useState } from "react";

function ThemeToggle({ darkMode, setDarkMode }) {
  
  return (
    <div
      className={`flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-transparent text-white border-white/20" : "bg-transparent text-black border-black/20"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`
          px-2 py-1.5 rounded-full
          transition-all duration-300
          border backdrop-blur-md
          active:scale-95
          ${
            darkMode
              ? "bg-transparent text-white border-white/20"
              : "bg-transparent text-black border-black/20"
          }
        `}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default ThemeToggle;