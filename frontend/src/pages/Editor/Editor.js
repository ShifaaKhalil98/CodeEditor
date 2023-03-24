import React, { Component, useState } from 'react'
import axios from 'axios'
import './Editor.css'

export default function Editor() {
    const [signed_in, setSignedIn] = useState(false)
    const [user_photo, setUserPhoto] = useState()

    return (
        <div className='container'>
            <div className='header'>
                <h1>CODING</h1>
                {signed_in ? <img src={user_photo} className="user-photo"/> : <span>Sign In</span>}
            </div>
        </div>
    )
}
