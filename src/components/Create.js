import React from 'react'
// import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Create.css'
import db from './firebase'


export default function Create() {

    // const [error, setError] = useState("")
    const { currentUser } = useAuth()

    function createActivty () {
        db.collection("activities").add({
            title: "Airsoft",
            description: "The outwoods",
            location: "That one place",
            hours: "9am - 8pm"
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
    }

    createActivty()

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
            <hr></hr>
            <main>
                <form className="add-vibe-form">
                    <h5>Title</h5>
                    <input type="text"></input>
                    <h5>Description</h5>
                    <input type="text"></input>
                    <h5>Location</h5>
                    <input type="text"></input>
                    <h5>Time of Operation</h5>
                    <input type="text"></input>
                    <button id="add-submit" className="btn btn-primary">Add Vibe</button>
                </form>
            </main>
        </div>
    )
}
