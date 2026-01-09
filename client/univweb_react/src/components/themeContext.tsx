import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext({
    darkMode:false,
    setDarkMode: (value:boolean)=>{}
})

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);
    
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div className={`${darkMode === true ? 'dark' : ''}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);