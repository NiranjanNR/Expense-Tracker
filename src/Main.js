import React, { useState } from 'react';
import App from './components/App';
import { lightTheme, darkTheme, GlobalStyles } from './Themes';
import { ThemeProvider } from 'styled-components';

const Main = () => {
    const [theme, setTheme] = useState("dark");
    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <button onClick={themeToggler} className="mt-3 ml-2">
                {theme === "dark" ?
                <img alt="" src={require('./components/images/Darkmode.webp')} height="40" width="40" />
                :
                <img alt="" src={require('./components/images/Lightmode.png')} height="40" width="40" />
                }
            </button>
            <App />
        </ThemeProvider>
    )
}

export default Main;