import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

export default function Category() {
    console.log("Category render");
    const value = useContext(ThemeContext);

    const catStyle = {
        height:'20%',
        width:'100%',
        backgroundColor:`${value.theme === 'Dark' ? 'grey' : 'black'}`,
        margin: '0 auto',
    };

    const pchStyle = {
        color:`${value.theme === 'Dark' ? 'black' : 'white'}`
    };

    return (
        <div className="category" style={catStyle}>
            <h1 style={pchStyle}>
                This is Category Component
            </h1>
            <button onClick={() => value.setTheme(value.theme === "Dark" ? "Light" : "Dark")}>Toggle</button>
        </div>
    )
}
