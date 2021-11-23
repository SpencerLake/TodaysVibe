import React, { useRef, useEffect, useState } from 'react'
import ReactMapGl from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import './Map.css'


export default function Map() {
    mapboxgl.accessToken = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
    const mapContainer = useRef(null)
        const map = useRef(null)
        const [lng, setLng] = useState(-79.9959)
        const [lat, setLat] = useState(40.4406)
        const [zoom, setZoom] = useState(9)

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
    })



    return (
        <div className="map-div">
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}