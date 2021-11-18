import React from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'


export default function Dashboard() {

    const { currentUser } = useAuth()



    return (
        <div className='dash-body'>
            <div className="header">
                <div classname='header-holders'>
                    <nav className="hamburger-menu">
                        <ul id="header-menu">
                            <Link to="/create" className="btn btn-primary">Add Vibe</Link>
                            <li className='menu-list'>Sort Vibes</li>
                            <li className='menu-list'>Log Out</li>
                        </ul>
                    </nav>
                </div>
                <div classname='header-holders'>
                    <h2>Dashboard</h2>
                </div>
                <div classname='header-holders'>
                    <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
                </div>
            </div>
            <hr></hr>
            <main className="dash-content">
                <div className="todays-vibes">
                    <h3 className="page-title">Today's Vibes</h3>
                    <hr className='title-break'></hr>
                    <div className="vibes">
                        <div className="individual-vibe">
                            <li>Airsofting</li>
                            <p>Battlegrounds</p>
                            <p>Location</p>
                            <p>1pm - 9:30pm</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}