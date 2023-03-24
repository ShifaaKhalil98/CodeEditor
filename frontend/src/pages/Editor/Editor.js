import React, { Component, useState } from 'react'
import axios from 'axios'
import './Editor.css'
import messages from '../../images/bubble.png'
import search from '../../images/search.png'
import files from '../../images/folder.png'

export default function Editor() {
    const [signed_in, setSignedIn] = useState(false)
    const [user_photo, setUserPhoto] = useState()
    const [console_open, setConsoleOpen] = useState(false)
    const [sidebar_open, setSidebarOpen] = useState(false)
    const [sidebar_selected, setSidebarSelected] = useState('')

    const openSideBar = (selected) => {
        selected == sidebar_selected && setSidebarOpen(!sidebar_open)
        setSidebarSelected(selected)
    }
    
    return (
        <div className='container'>
            <div className='header'>
                <h1>CODING</h1>
                {signed_in ? <img src={user_photo} className="user-photo"/> : <span>Sign In</span>}
            </div>
            <div className='editor-container'>
                <div className='side-bar'>
                    <img src={search} className="menu-button bright" onClick={() => openSideBar('search')}/>
                    <img src={files} className="menu-button bright" onClick={() => openSideBar('files')}/>
                    <img src={messages} className="menu-button" onClick={() => openSideBar('messages')}/>
                </div>
                <div className={sidebar_open ? 'sidebar-open' : 'sidebar-closed'}>
                    {sidebar_selected == 'search' && 
                    <div>Search</div>
                    }
                    {sidebar_selected == 'files' && 
                    <div>Files</div>
                    }
                    {sidebar_selected == 'messages' && 
                    <div>Messages</div>
                    }
                </div>
                <div className='editor'>
                    <textarea className='editor-input' placeholder='Write your code here...'></textarea>
                </div>
                <div className={console_open ? 'console-open' : 'console'}>
                    <div className='button-container'>
                        <button type='button' onClick={() => setConsoleOpen(true)}>Run</button>
                        <button type='button'>Save</button>
                        <button type='button'>Download</button>
                    </div>
                    {console_open && <span onClick={() => setConsoleOpen(false)}>Close Console >> </span>}
                    {console_open && <textarea className='editor-input' placeholder='Write your code here...'></textarea>}
                </div>
            </div>
        </div>
    )
}
