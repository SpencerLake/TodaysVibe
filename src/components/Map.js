import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactMapGl from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Geocoder from 'react-map-gl-geocoder'
import MapGL from 'react-map-gl'


// export default function Map() {
//     mapboxgl.accessToken = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
//     const mapContainer = useRef(null)
//         const map = useRef(null)
//         const [lng, setLng] = useState(-79.9959)
//         const [lat, setLat] = useState(40.4406)
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
//             <Geocoder 
            
//             />
//         </div>
//     )
// }

const MAPBOX_TOKEN = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"

export default function Map() {
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

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            })
        },
        []
    )

    return (
        <div className="map-container">
            <MapGL 
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                // style='mapbox://styles/mapbox/streets-v11'
            >
                <Geocoder 
                    mapRef={mapRef}
                    onviewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position='top-left'
                />
            </MapGL>
        </div>
    )
}