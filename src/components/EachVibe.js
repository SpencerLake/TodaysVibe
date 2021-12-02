import React, { useState, useEffect } from 'react'
import './EachVibe.css'
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa'


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


        if(openTime <= test && closeTime > test) {
            setIsOpen(true)
        }

        function maths(num) {
            return num - 12
        }

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