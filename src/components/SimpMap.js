import React, { useRef, useEffect, useState, useCallback } from 'react'
import './Map.css'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'



// //    =========================Rendered Stuff==================================================

//     return (
    //         <div className="map-div">
    //             <div ref={mapContainerRef} className="map-container" />
    //         </div>
    //     )
    // }
    
    const MAPBOX_TOKEN = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
    
    export default function CreateSimpMap(props) {
        const [viewport, setViewport] = useState({
            latitude: 40.4406,
            longitude: -79.9959,
            zoom: 8
        })
        const mapRef = useRef()
        const handleViewportChange = useCallback(
            (newViewport) => setViewport(newViewport),
            []
            )
            
            const handleGeocoderViewportChange = useCallback(
                (newViewport) => {
                    const geocoderDefaultOverrides = { transitionDuration: 1000 }

                    console.log( newViewport )
                    props.handleCoords({ latitude: newViewport.latitude, longitude: newViewport.longitude })
                    console.log(newViewport)

                    return handleViewportChange({
                        ...newViewport,
                        ...geocoderDefaultOverrides
                    })
                },
                []
                )
                // console.log(viewport)
                let coordsLat = viewport.latitude

                
                console.log()
                
                return (
                    <div className="map-container">
            <MapGL 
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                <Geocoder 
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position='top-left'
                // porximity={}
                />
            </MapGL>
        </div>
    )
}