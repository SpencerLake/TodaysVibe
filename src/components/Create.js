import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import './Create.css'


export default function Create() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div className="profile-body">
            <div className="header">
                <nav className="hamburger-menu">
                    <ul id="menu">
                        <Link to="/" className="menu-list">Dashboard</Link>
                    </ul>
                </nav>
                <h2>Add Vibe</h2>
                <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
            </div>
            <main>
                
            </main>
        </div>
    )
}
