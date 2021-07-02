import React, { useState, useEffect } from 'react'

export default function Infinite() {
    console.log("render");
    const [count, setCount] = useState(0);

    // adding setCount in useEffect leads to infinite renders
    // solution - adding empty dependency array leads to one time run of useEffect after rendering 1st time only
    //  so, do keep note when adding set state function in useEffect
    useEffect(() => {
        console.log("useEffect");
        let num = Math.random() * 100;
        setCount(num);
    }, [])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
        </div>
    )
}
