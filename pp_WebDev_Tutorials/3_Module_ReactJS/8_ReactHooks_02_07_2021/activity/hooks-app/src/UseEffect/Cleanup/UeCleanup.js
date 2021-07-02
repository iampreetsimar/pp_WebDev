/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

/*
    useEffect with Clean up:
        - we can return a function from useEffect 
        - this function runs before the next useEffect is run
        - adding empty dependency array, useEffect runs only once as it works like componentDidMount, which means returned 
          function runs only when component is unmounted, meaning, returned function runs only once
          i.e, runs just before componentWillUnmount
        
*/

export default function UeCleanup() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("useEffect");
        document.title = `Clicked ${count} times`;
        
        // for clean up - add a return function
        return () => {
            alert( "I'll be called before the next useEffect is called, " + count);
        }
    }, []);

    console.log("render");
    return (
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
        </div>
    )
}
