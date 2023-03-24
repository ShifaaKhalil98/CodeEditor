import React, { Component, useState } from 'react'
import axios from 'axios'
import './Editor.css'
import messages from '../../images/bubble.png'
import search from '../../images/search.png'
import files from '../../images/folder.png'

export default function Editor() {
    const [signed_in, setSignedIn] = useState(false)
    const [user_photo, setUserPhoto] = useState()

    return (
        <div className='container'>
            <div className='header'>
                <h1>CODING</h1>
                {signed_in ? <img src={user_photo} className="user-photo"/> : <span>Sign In</span>}
            </div>
            <div className='editor-container'>
                <div className='side-bar'>
                    <img src={search} className="menu-button bright"/>
                    <img src={files} className="menu-button bright"/>
                    <img src={messages} className="menu-button"/>
                </div>
                <div className='editor'>
                    <textarea className='editor-input' placeholder='Write your code here...'></textarea>
                </div>
                <div className='console'>
                    <button type='button'>Run</button>
                    <button type='button'>Save</button>
                    <button type='button'>Download</button>
                </div>
            </div>
        </div>
    )
}
