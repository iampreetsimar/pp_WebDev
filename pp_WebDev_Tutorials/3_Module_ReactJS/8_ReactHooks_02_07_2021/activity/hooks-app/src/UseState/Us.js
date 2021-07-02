import React, { useState } from 'react'

export default function Us() {

    const [messageObject, setMessage] = useState({message: '', id: 1});

    const handleChange = (e) => {
        let val = e.target.value;

        // this won't work as address of object is same so state is changing but re-rendering does not happen
        // messageObject.message = val;

        // using destructuring to create new object so that component re-render 
        // setMessage({...messageObject, message: val});

        // have to set all value in new object
        // let newObj = {message: val};

        // using spread operator for destructuring won't delete id from object, as entire object is being copied to newObj at new reference
        // then we 're updating message key in new Obj
        let newObj = {...messageObject, message: val};
        setMessage(newObj);
    }

    return (
        <div>
            <input type="text" value={messageObject.message} onChange={handleChange} />
            <p>{messageObject.message}</p>
        </div>
    )
}
