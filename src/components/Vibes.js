import React from 'react'
import './Vibes.css'

export default function Body() {
    return(
        <div className="body">
            <div className="open-vibes" id="open">
            <h3>Open</h3>

                <ul className="vibe" id="open-vibes">
                    <li>filer stuff</li>
                </ul>
            </div>
            <br />
            <div className="closed-vibes" id="closed">
                <h3>Closed</h3>
                <ul className="vibe" id="closed-vibes">
                    <li>filler stuff</li>
                </ul>
            </div>
        </div>
    )
}