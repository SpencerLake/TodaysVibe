import React, { useState, setState, useEffect, useRef, ref } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import app from './firebase'


export default function Dashboard() {

    const { currentUser } = useAuth()
    const [ vibes, setVibes ] = useState([])



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
        for(const doc of newArray){
        }
    }
    
    useEffect(() => {
        fetchVibes()
    }, [])

    

    function deleteVibe(vibex) {
        app.firestore().collection('activities').where("title", "==", vibex).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete()
            })
    }

    // console.log(vibes)
    // console.log(allVibes)

    return (
        <div className='dash-body'>
            <div className="header">
                <div className='header-holders'>
                    <nav className="hamburger-menu">
                        <ul id="header-menu">
                            <Link to="/create" className="btn btn-primary">Add Vibe</Link>
                        </ul>
                    </nav>
                </div>
                <div className='header-holders'>
                    <h2>Dashboard</h2>
                </div>
                <div className='header-holders'>
                    <Link to="/profile" className="btn btn-primary">{currentUser.email}</Link>
                </div>
            </div>
            <hr></hr>
            <main className="dash-content">
                <div className="todays-vibes">
                    <h3 className="page-title">Today's Vibes</h3>
                    <hr className='title-break'></hr>
                    <div className="vibes">
                        {vibes && vibes.map(vibe=>{
                            // console.log(vibe.id)
                            return(
                                <div className="individual-vibe">
                                    <li>{vibe.title}</li>
                                    <p>{vibe.description}</p>
                                    <p>{vibe.location}</p>
                                    <p>{vibe.hoursOpen}</p>
                                    <p>{vibe.hoursClose}</p>
                                    <button onClick={() => deleteVibe(vibe.title)}>delete</button>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}