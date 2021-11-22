import React, { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import app from './firebase'


export default function Dashboard() {

    const { currentUser } = useAuth()
    const [ vibes, setVibes ] = useState([])


    const fetchVibes=async()=>{
        const res = app.firestore().collection('activities')
        const data = await res.get()
        data.docs.forEach(item => {
            setVibes([...vibes,item.data()])
        })
        // console.log(vibes)
    }
    
    useEffect(() => {
        fetchVibes()
    }, [])

    // console.log(vibes)
    // console.log(allVibes)

    return (
        <div className='dash-body'>
            <div className="header">
                <div className='header-holders'>
                    <nav className="hamburger-menu">
                        <ul id="header-menu">
                            <Link to="/create" className="btn btn-primary">Add Vibe</Link>
                        </ul>
                    </nav>
                </div>
                <div className='header-holders'>
                    <h2>Dashboard</h2>
                </div>
                <div className='header-holders'>
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
                        {vibes && vibes.map(vibe=>{
                            console.log(vibes)
                            return(
                                <div className="individual-vibe">
                                    <li>{vibe.title}</li>
                                    <p>{vibe.description}</p>
                                    <p>{vibe.location}</p>
                                    <p>{vibe.hours}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}