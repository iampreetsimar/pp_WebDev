import React from 'react';
// import React, { useContext } from 'react';
// import MyContext from './Context';
import DemoChild from './DemoChild';

function Demo() {
    console.log("Demo render");
    // const val = useContext(MyContext);
    // console.log(val);
    return (
        <div>
            <DemoChild />
        </div>
    )
}

export default React.memo(Demo);
