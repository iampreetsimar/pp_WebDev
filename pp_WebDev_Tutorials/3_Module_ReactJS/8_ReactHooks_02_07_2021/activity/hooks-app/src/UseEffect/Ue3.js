/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './ue3.css';

/*
    3rd Variation - Non empty Dependency array
    Run useEffect when a particular states are updated by passing those states in dependency array 
*/

export default function Ue3() {
    const [count, setCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    // useEffect was running for changing state of darkMode which we don't want as we are changing count in title
    // solution - add dependency array and pass count in it, this runs useEffect only when state of count is changed
    useEffect(() => {
        console.log("useEffect");
        document.title = `Clicked ${count} times`;
    }, [count]);

    console.log("render");

    return (
        <div className={darkMode ? "view dark-mode" : "view"}>
            <label htmlFor="darkMode">Dark Mode</label>
            <input type="checkbox" name="darkMode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
        </div>
    )
}
