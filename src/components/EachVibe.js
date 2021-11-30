import React, { useState, useEffect } from 'react'
import app from './firebase'


export default function EachVibe(props) {

    let [ isOpen, setIsOpen ] = useState(false)

    // const makeMarker = (open, close) => {
    //     let openTime = parseInt(open)
    //     let closeTime = parseInt(close)
    //     let currentCheckTime = new Intl.DateTimeFormat('en-US', {hour: '2-digit'}).format(nowTime)
    //     let today = new Date()
    //     let test = today.getHours()
    //     const nowTime = Date.now()
    // }

    useEffect(() => {
        let openTime = parseInt(props.vibe.hoursOpen)
        let closeTime = parseInt(props.vibe.hoursClose)
        const nowTime = Date.now()
        let currentCheckTime = new Intl.DateTimeFormat('en-US', {hour: '2-digit'}).format(nowTime)
        let today = new Date()
        let test = today.getHours()

        // console.log(openTime)

        if(openTime <= test && closeTime > test) {
            setIsOpen(true)
        }

        console.log(openTime, closeTime, test, isOpen)

    })


            function mark() {
            let newmark = React.createElement('div', {className: 'open-indicator-open'})
            }

            // function deleteVibe(vibex) {
            //     app.firestore().collection('activities').where("title", "==", vibex).get()
            //     .then(querySnapshot => {
            //         querySnapshot.docs[0].ref.delete()
            //     })
            // }





    return(
        <div className="individual-vibe">
            {isOpen ? <div className="open-indicator-open" /> : <div className="open-indicator-closed" />}
            <p>{props.vibe.title}</p>
            <p>{props.vibe.description}</p>
            <button className="btn btn-secondary"  onClick={() => props.setNewPoint(props.vibe.latitude, props.vibe.longitude)}>Location</button>
            <p>{props.vibe.hoursOpen}</p>
            <p>{props.vibe.hoursClose}</p>
            <button className="btn btn-secondary" onClick={() => props.deleteVibe(props.vibe.title)}>delete</button>
        </div>
    )
}