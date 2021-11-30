import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import app from './firebase'
import MapGL, { FlyToInterpolator, Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { ImLocation } from 'react-icons/im'
import './Map.css'
import EachVibe from './EachVibe'



export default function Dashboard(props) {

    const { currentUser } = useAuth()
    const [ vibes, setVibes ] = useState([])
    const [ coords, setCoords ] = useState({
        latitude: '',
        longitude: ''
    })
    const [ time, setTime ] = useState('')


    const fetchVibes=async()=>{
        let newArray = []
        const res = app.firestore().collection('activities')
        const data = await res.get()
        // console.log(data.docs[0].id)
        // data.then(snapshot => )
        
        data.docs.map(item => {
            newArray.push(item.data())
            // setVibes([...vibes,item.data()])
            // console.log(item.id)
        })
        // console.log(newArray)
        setVibes(newArray)
        // console.log(newArray)
        // for(const doc of newArray){
        // }
    }
    
    useEffect(() => {
        fetchVibes()
        const nowTime = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
            .format(nowTime);
        setTime(currentTime)
    }, [])

    function deleteVibe(vibex) {
                app.firestore().collection('activities').where("title", "==", vibex).get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete()
                    setTimeout(fetchVibes(), 250)
                })
            }
    

    

    



// map stuff ==========================================================================================================

    const MAPBOX_TOKEN = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
    
        const [lat, setLat] = useState(40.4406)
        const [lon, setLon] = useState(-79.9959)

        const [viewport, setViewport] = useState({
            latitude: lat,
            longitude: lon,
            zoom: 10
        })

        const mapRef = useRef()

        useEffect(() => {
            setViewport({
                latitude: lat,
                longitude: lon,
                zoom: 10,
                transitionInterpolator:
                    new FlyToInterpolator({ speed: 1.0 }),
                transitionDuration: "auto",
            })
        }, [lat, lon])

                // console.log(viewport)
                let coordsLat = viewport.latitude

                function setNewPoint(lati, lng) {
                    setLat(lati)
                    setLon(lng)
                    console.log(lat, lon)
                }




            return (
        <div className='dash-body'>
            <div className="header">
                <div className="header-holder">
                    <Link to="/create" className="btn btn-primary">Add Vibe</Link>
                </div>
                <div className="header-holder">
                    <h2>Dashboard</h2>
                </div>
                <div className="header-holder">
                    <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
                </div>
            </div>
            <hr></hr>
            <main className="dash-content">
                <div className="todays-vibes">
                    <h3 className="page-title">Today's Vibes</h3>
                    <h5>{time}</h5>
                    <hr className='title-break'></hr>
                    <div className="vibes">
                        {vibes && vibes.map(vibe=>{
                            console.log(vibe.id)
                            return(
                                <EachVibe deleteVibe={ deleteVibe } setNewPoint={ setNewPoint } vibe={ vibe }/>
                            )
                        })
                        
                        }
                    </div>
                </div>
                <div id='the-map'>
                    <div className="map-container">
                        <MapGL 
                            ref={mapRef}
                            {...viewport}
                            width="100%"
                            height="100%"
                            onViewportChange={(viewport) => setViewport(viewport)}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                            <Marker latitude={lat} longitude={lon}>
                                <ImLocation size="30px" />
                            </Marker>
                        </MapGL>
                    </div>
                </div>
            </main>
        </div>
    )
}