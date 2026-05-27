import {createContext, useContext , useState, useEffect} from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState("dark");

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
    }, [themeMode ]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default function useTheme() {
    return useContext(ThemeContext);
}