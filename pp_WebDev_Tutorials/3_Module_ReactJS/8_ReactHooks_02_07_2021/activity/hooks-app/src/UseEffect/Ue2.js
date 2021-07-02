/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react'

/*
    2nd Variation - ComponentDidMount - runs only after first render
    optional dependency array is present
    empty dependency array
*/
export default function Ue2() {
    const [count, setCount] = useState(0);

    // runs only first render
    useEffect(() => {
        console.log("useEffect");
        document.title = `Clicked ${count} times`;
    }, []);

    console.log("render");

    return (
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
        </div>
    )
}
