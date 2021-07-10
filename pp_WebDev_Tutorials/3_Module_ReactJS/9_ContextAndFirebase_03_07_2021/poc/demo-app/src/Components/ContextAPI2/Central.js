import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import Navbar from './Navbar';

export default function Central() {
    const [nTheme, setnTheme] = useState("light");
    console.log("Central render");
    return (
        <div>
            <ThemeContext.Provider value={{ theme: nTheme, setTheme: setnTheme}}>
                <Navbar />
            </ThemeContext.Provider>
        </div>
    )
}
