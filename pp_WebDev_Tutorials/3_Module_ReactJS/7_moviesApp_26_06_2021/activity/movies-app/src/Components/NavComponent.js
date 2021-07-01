import React from 'react';
import { Link } from "react-router-dom";

export default function NavComponent() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>
                    <li>
                    <Link to="/movies">Movies</Link>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>
    )
}
