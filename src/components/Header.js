import React from 'react'
import './Header.css'


export default function Header() {
    return(
        <div className="header">
            <nav className="hamburger-menu">
                <ul id="menu">
                    <li><a href="./addVibe">Add Vibe</a></li>
                    <li>Sort Vibes</li>
                    <li>Log Out</li>
                </ul>
            </nav>
            <p id="username">Username</p>
        </div>
    )
}