// import React, { useContext } from 'react';
import React from 'react';
// import ThemeContext from './ThemeContext';
import Category from  "./Category";
import Dropdown from "./Dropdown";

function Navbar() {
    console.log("Navbar render");
    // const value = useContext(ThemeContext);
    // console.log(value);

    const navStyle = {
        height:'30vh',
        width:'90vw',
        backgroundColor:'black',
        margin: '0 auto',
        marginTop:'5%'
    }

    const pStyle ={
        color:`white`
    }

    return (
        <div className='navbar' style={navStyle}>
            <h2 style={pStyle}>
                This is Navbar
            </h2> 
            <Dropdown/>
            <Category/>
        </div>
    )
}

export default React.memo(Navbar);
