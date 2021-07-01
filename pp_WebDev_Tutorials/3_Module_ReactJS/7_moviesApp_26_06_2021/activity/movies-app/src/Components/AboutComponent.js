import React from 'react'

export default function AboutComponent({isAuth}) {
    console.log(isAuth);
    return (
        <div>
            <h1>This is About Component!</h1>
        </div>
    )
}
