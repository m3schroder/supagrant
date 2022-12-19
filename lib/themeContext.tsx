import React, {useEffect, useState} from "react";
import {setTheme as initialTheme} from "@/lib/themeing";

const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => {}
});

const ThemeProvider = ({children}: any) => {
    const [theme, setTheme] = useState("");
    useEffect(() => {
        initialTheme()
        setTheme(localStorage.theme)
    }, [])
    const toggleTheme = () => {
        const prevMode = localStorage.theme;
        const newMode = prevMode == 'light' ? "dark" : "light"
        localStorage.setItem("theme", newMode)
        setTheme(newMode)
        document.documentElement.classList.remove(prevMode)
        document.documentElement.classList.add(newMode)
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export {ThemeContext, ThemeProvider};
