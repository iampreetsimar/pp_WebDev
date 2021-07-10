import React, { useContext } from 'react';
import MyContext from './Context';

function DemoChild() {
    console.log("Demo child render");
    const val = useContext(MyContext);
    console.log(val);
    return (
        <div>
            DemoChild Component
        </div>
    )
}

export default DemoChild
