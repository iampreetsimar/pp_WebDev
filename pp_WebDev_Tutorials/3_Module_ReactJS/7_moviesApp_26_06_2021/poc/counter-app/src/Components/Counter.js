import React, { useState } from 'react'

// We're using UseState hook for this app
export default function Counter() {
    // any change in state runs the entire component again
    console.log("render");

    // how state are managed in class components
    // this.state = {
    //     count: 0
    // }
    // this.setState({})

    // hook is used in component only
    // useState returns us a pair of values - current state and a function to change current state
    // we pass initial value of our state to useState as argument
    // hook runs only once in the beginning, after that on re-rendering of component, hooks don't run again
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }
    const handleDecrement = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <button onClick={handleIncrement}>+</button>
            <h2>{count}</h2>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}
