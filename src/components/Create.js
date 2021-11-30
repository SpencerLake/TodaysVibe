import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Create.css'
import app from './firebase'
import CreateMap from './Map'
// import { ReactBingmaps} from 'react-bingmaps'
import 'mapbox-gl'
// import mapboxgl from 'mapbox-gl'



export default function Create() {
    const { currentUser } = useAuth()
    const [message, setMessage] = useState('')

    
    const actTitle = useRef(null)
    const actDescrip = useRef(null)
    const actLocalLat = useRef(null)
    const actLocalLng = useRef(null)
    const actTimeOpen = useRef(null)
    const actTimeClose = useRef(null)


    function createActivty(e) {
        e.preventDefault()
        app.firestore().collection("activities").add({
            title: actTitle.current.value,
            description: actDescrip.current.value,
            // location: actLocal.current.value,
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
            // actLocalLat.current.value = ''
            // actLocalLng.current.value = ''
            actTimeOpen.current.value = ''
            actTimeClose.current.value = ''
            setMessage('Vibe created!')
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
    }

    
        let [coords, setCoords] = useState({
            latitude: '',
            longitude: ''
        })


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
                        {/* <input type="text" ref={actLocal} placeholder="to be changed"></input> */}
                            <p ref={actLocalLat}>{coords.latitude}</p>
                            {/* <input type='text' ref={actLocalLat} placeholder="Latitude"></input> */}
                        <p className="local-titles">Longitude</p>
                            <p ref={actLocalLng}>{coords.longitude}</p>
                            {/* <input type='text' ref={actLocalLng} placeholder="Longitude"></input> */}
                        <h5>Time of Operation</h5>
                        <p>Open</p>
                            <input type="time" ref={actTimeOpen}></input>
                        <p>Close</p>
                            <input type="time" ref={actTimeClose}></input>
                        <button id="add-submit" className="btn btn-primary">Add Vibe</button>
                    </form>
                    <div id='the-map'>
                        <CreateMap handleCoords={(coords) => setCoords(coords)} />
                    </div>
                </div>
            </main>
        </div>
    )
}
