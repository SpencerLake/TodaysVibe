import React, { useState, useEffect } from 'react'
import './EachVibe.css'
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa'

// Functional component that houses each individual activity (needed to allow the open indicator to check the open and close times and set it's color)

export default function EachVibe(props) {

    let [ isOpen, setIsOpen ] = useState(false)
    let [ displayTimeOpen, setDisplayTimeOpen ] = useState()
    let [ displayTimeClosed, setDisplayTimeClosed ] = useState()

    useEffect(() => {
        let openTime = parseInt(props.vibe.hoursOpen)
        let closeTime = parseInt(props.vibe.hoursClose)
        let displayOpen = parseInt(props.vibe.hoursOpen)
        let displayClosed = parseInt(props.vibe.hoursClose)
        let today = new Date()
        let test = today.getHours()

        // Boolean operator dictating status

        if(openTime <= test && closeTime > test) {
            setIsOpen(true)
        }

        // Setting 24hr clock to display as a 12hr clock

        function maths(num) {
            return num - 12
        }

        // Setting either AM or PM on time displayed

        if(displayOpen > 12){
            setDisplayTimeOpen(maths(displayOpen) + " PM")
        } else if (displayOpen <= 12) {
            setDisplayTimeOpen(displayOpen + " AM")
        }

        if(displayClosed > 12){
            setDisplayTimeClosed(maths(displayClosed) + " PM")
        } else if (displayClosed <= 12) {
            setDisplayTimeClosed(displayClosed + " AM")
        }

    }, [props.vibe.hoursOpen, props.vibe.hoursClose, displayTimeClosed, displayTimeOpen])
    
    // All rendered content

    return(
        <div className="individual-vibe">
            {isOpen ? <div className="open-indicator-open" /> : <div className="open-indicator-closed" />}
            <p className="card-title">{props.vibe.title}</p>
            <p>{props.vibe.description}</p>
            <button className="btn btn-secondary"  onClick={() => props.setNewPoint(props.vibe.latitude, props.vibe.longitude)}><FaMapMarkerAlt /></button>
            <p>{displayTimeOpen} - {displayTimeClosed}</p>
            <button className="btn btn-secondary" onClick={() => props.deleteVibe(props.vibe.title)}><FaTrash /></button>
        </div>
    )
}