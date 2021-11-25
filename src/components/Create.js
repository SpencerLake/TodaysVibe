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
import coordsLat from './Map'
import coordsLng from './Map'



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

    // const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

    // let map = new mapboxgl.Map({
    //     container: 'the-map',
    //     style: 'mapbox://styles/mapbox/streets-v11'
    // })
    // function Map() {
    //     mapboxgl.accessToken = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
    //     const mapContainer = useRef(null)
    //         const map = useRef(null)
    //         const [lng, setLng] = useState(-70.9)
    //         const [lat, setLat] = useState(42.35)
    //         const [zoom, setZoom] = useState(9)
    
    //     useEffect(() => {
    //         if (map.current) return;
    //         map.current = new mapboxgl.Map({
    //             container: mapContainer.current,
    //             style: 'mapbox://styles/mapbox/streets-v11',
    //             center: [lng, lat],
    //             zoom: zoom
    //         })
    //     })
    
    
    //     return (
    //         <div className="map-div">
    //             <div ref={mapContainer} className="map-container" />
    //         </div>
    //     )
    // }

    console.log(CreateMap.viewport)

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
            <main className="create-girth">
                <div className="create-contents">
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
                    <div id='the-map'>
                        <CreateMap />
                    </div>
                </div>
            </main>
        </div>
    )
}
