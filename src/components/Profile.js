import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import './Profile.css'


export default function Profile() {

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
                <div className="header-holder">
                    <Link to="/" className="btn btn-primary" id="nav-button">Dashboard</Link>
                    <Link to="/create" className="btn btn-primary">Add Vibe</Link>
                </div>
                <div className="header-holder">
                    <h2>Profile</h2>
                </div>
                <div className="header-holder">
                    <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
                </div>
            </div>
            <div className="profile-content">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert varient="danger">{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button  className="btn btn-secondary" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </div>
    )
}
