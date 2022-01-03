import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import app from './firebase'
import CreateMap from './Map'
import './Create.css'
import 'mapbox-gl'



export default function Create() {

// Variables

    const { currentUser } = useAuth()
    const [message, setMessage] = useState('')

    const actTitle = useRef(null)
    const actDescrip = useRef(null)
    const actLocalLat = useRef(null)
    const actLocalLng = useRef(null)
    const actTimeOpen = useRef(null)
    const actTimeClose = useRef(null)

// Function that creates an activity

    function createActivty(e) {
        e.preventDefault()
        app.firestore().collection("activities").add({
            title: actTitle.current.value,
            description: actDescrip.current.value,
            latitude: coords.latitude,
            longitude: coords.longitude,
            hoursOpen: actTimeOpen.current.value,
            hoursClose: actTimeClose.current.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            setMessage('')
            actTitle.current.value = ''
            actDescrip.current.value = ''
            actTimeOpen.current.value = ''
            actTimeClose.current.value = ''
            setMessage('Vibe created!')
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
    }

    // Coordinates that will be selected by map 

        let [coords, setCoords] = useState({
            latitude: '',
            longitude: ''
        })

    // Everything rendered

    return (
        <div className="profile-body">
            <div className="header">
                <div className="header-holder">
                    <Link to="/" className="btn btn-primary">Dashboard</Link>
                </div>        
                <div className="header-holder">    
                    <h2>Add Vibe</h2>
                </div>
                <div className="header-holder">    
                    <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
                </div>
            </div>
            <hr></hr>
            <main className="create-girth">
                <div className="create-contents">
                    <form className="add-vibe-form" onSubmit={createActivty}>
                        {message && <Alert variant='success'>{message}</Alert>}
                        <h5>Title</h5>
                            <input type="text" ref={actTitle} placeholder="Don't reuse Title's"></input>
                        <h5>Description</h5>
                            <input type="text" ref={actDescrip} placeholder="200 max characters"></input>
                        <h5>Location</h5>
                        <p className="local-titles">Latitude</p>
                            <p ref={actLocalLat}>{coords.latitude}</p>
                        <p className="local-titles">Longitude</p>
                            <p ref={actLocalLng}>{coords.longitude}</p>
                        <h5>Time of Operation</h5>
                        <p>Open</p>
                            <input type="time" required step="3600" ref={actTimeOpen}></input>
                        <p>Close</p>
                            <input type="time" required step="3600" ref={actTimeClose}></input>
                        <button id="add-submit" className="btn btn-primary">Add Vibe</button>
                    </form>
                    <div className="map-border">
                        <div id='the-map'>
                            <CreateMap handleCoords={(coords) => setCoords(coords)} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
