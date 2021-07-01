import React from 'react';
import { Link } from "react-router-dom";
import "./nav.css";

export default function NavComponent() {
    return (
        <>
            <nav className="nav-bar">
                <h3>Logo</h3>
                <ul className="nav-list h3">
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Home</Link></li>
                    <li><Link to="/about" style={{ textDecoration: 'none', color: 'whitesmoke' }}>About</Link></li>
                    <li><Link to="/movies" style={{ textDecoration: 'none', color: 'whitesmoke' }}>Movies</Link></li>
                </ul>
            </nav>
        </>
    )
}
