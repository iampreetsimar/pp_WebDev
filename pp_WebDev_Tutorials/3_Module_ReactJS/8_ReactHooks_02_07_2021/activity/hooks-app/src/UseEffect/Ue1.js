import React, { useState, useEffect } from 'react';

// useEffect provides lifecycle methods - componentDidMount, componentDidUpdate, componentWillUnmount
// helps us invoke side effects within functional components
// useEffect - runs after render each time
// useState - runs on first render only

/*
SYNTAX: useEffect(() => {
    code
}, optionalDependencyArray)
*/
export default function Ue1() {
    const [count, setCount] = useState(0);

    // this runs after each render
    // first variation - (componentDidMount + componentDidUpdate) - as it runs after each render
    // no optional dependency array is passed in this variation
    useEffect(() => {
        console.log("useEffect");
        document.title = `Clicked ${count} times`;
    });

    console.log("render");

    return (
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}> Click Me!</button>
        </div>
    )
}
