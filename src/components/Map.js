import React, { useRef, useEffect, useState, useCallback } from 'react'
// import ReactMapGl from 'react-map-gl'
// import mapboxgl from 'mapbox-gl'
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import './Map.css'
import Geocoder from 'react-map-gl-geocoder'
import MapGL from 'react-map-gl'
// import { response } from 'express'



// export default function Map() {
//     const map = useRef(null)
//     const mapContainerRef = useRef(null)
//     mapboxgl.accessToken = 'pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA'
    
//     const fetchData = useCallback(() => {
//         const geocodingClient = mbxGeocoding({
//             accessToken: mapboxgl.accessToken
//         })
    
//      //    geocoding with countries
//         return geocodingClient
//             .forwardGeocode({
//                 query: 'Ikeja, Lagos',
//                 countries: ['ng'],
//                 limit: 2,
//             })
//             .send()
//             .then((response) => {
//                 const match = response.body
//                 const coordinates = match.features[0].geometry.coordinates
//                 const placeName = match.features[0].place_name
//                 const center = match.features[0].center
    
//             return {
//                 type: 'Feature',
//                 center: center,
//                 geometry: {
//                     type: 'Point',
//                     coordinates: coordinates,
//                 },
//                 properties: {
//                     description: placeName,
//                 },
//             }
//         })
//     }, [])

//     useEffect(() => {
//         if (map.current) return;

//        map.current = new mapboxgl.Map({
//            container: mapContainerRef.current,
//            style: 'mapbox://styles/mapbox/streets-v11',
//            zoom: 9,
//            center: [-79.9959, 40.4406]
//        })

//        return () => map.current.remove()
//    }, [])

//    useEffect(() => {
//        if (map.current) return

//        const results = fetchData()

//        results.then((marker) => {
//            let el = document.createElement('div')
//            el.className = 'marker'
           
//            new mapboxgl.Marker(el)
//            .setLngLat(marker.goemetry.coordinates)
//            .setPopup(
//                new mapboxgl.Popup({ offset: 25 })
//                .setHTML('<p>' + marker.properties.description + '</p>')
//                )
//                .addTo(map.current)
               
//            map.current.on('load', async () => {
//                map.current.flyTo({
//                    center: marker.center,
//                })
//            })    
//        })
//    }, [fetchData])




// //    =========================Rendered Stuff==================================================

//     return (
    //         <div className="map-div">
    //             <div ref={mapContainerRef} className="map-container" />
    //         </div>
    //     )
    // }
    
    const MAPBOX_TOKEN = "pk.eyJ1Ijoic3BlbmNlci1sYWtlIiwiYSI6ImNrd2NsanN4NTM2N3MzMnA4M2ppbHdmejcifQ.x13st-iWEuX1a0apjfIYDA"
    
    export default function CreateMap(props) {
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
