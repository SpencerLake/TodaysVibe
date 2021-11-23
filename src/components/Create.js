import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Create.css'
import app from './firebase'


export default function Create() {
    const { currentUser } = useAuth()
    const [message, setMessage] = useState('')

    
    const actTitle = useRef(null)
    const actDescrip = useRef(null)
    const actLocal = useRef(null)
    const actTimeOpen = useRef(null)
    const actTimeClose = useRef(null)

    function createActivty(e) {
        e.preventDefault()
        app.firestore().collection("activities").add({
            title: actTitle.current.value,
            description: actDescrip.current.value,
            location: actLocal.current.value,
            hoursOpen: actTimeOpen.current.value,
            hoursClose: actTimeClose.current.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            setMessage('')
            actTitle.current.value = ''
            actDescrip.current.value = ''
            actLocal.current.value = ''
            actTimeOpen.current.value = ''
            actTimeClose.current.value = ''
            setMessage('Vibe created!')
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
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
            <hr></hr>
            <main>
                <form className="add-vibe-form" onSubmit={createActivty}>
                    {message && <Alert variant='success'>{message}</Alert>}
                    <h5>Title</h5>
                    <input type="text" ref={actTitle} placeholder="Don't reuse Title's"></input>
                    <h5>Description</h5>
                    <input type="text" ref={actDescrip} placeholder="200 max characters"></input>
                    <h5>Location</h5>
                    <input type="text" ref={actLocal} placeholder="to be changed"></input>
                    <h5>Time of Operation</h5>
                    <p>Open</p>
                    <input type="time" ref={actTimeOpen}></input>
                    <p>Close</p>
                    <input type="time" ref={actTimeClose}></input>
                    <button id="add-submit" className="btn btn-primary">Add Vibe</button>
                </form>
            </main>
        </div>
    )
}
