import useTheme from "../../context/ThemeContext";

function ThemeToggle() {

  const { themeMode, toggleTheme} = useTheme();

  const onChangeTheme = (e) => {
    toggleTheme();
  }



  return (

    <div
      className="
        flex items-center justify-center
        transition-colors duration-500

        bg-transparent

        text-black
        dark:text-white
      "
    >

      <button

        onClick={onChangeTheme}

        className="
          px-2 py-1.5
          rounded-full

          transition-all duration-300

          border
          backdrop-blur-md

          active:scale-95

          bg-transparent

          text-black
          border-black/20

          dark:text-white
          dark:border-white/20
        "
      >

        {
          
            themeMode === "dark"
            ? "🌙"
            : "☀️"
        }

      </button>

    </div>
  );
}

export default ThemeToggle;