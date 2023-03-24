import React, { Component, useState } from 'react'
import axios from 'axios'
import './Editor.css'
import messages_pic from '../../images/bubble.png'
import search_pic from '../../images/search.png'
import files_pic from '../../images/folder.png'
import loading_pic from '../../images/loading.gif'
import { saveAs } from 'file-saver'

export default function Editor() {
    const [signed_in, setSignedIn] = useState(false)
    const [user_photo, setUserPhoto] = useState()
    const [console_open, setConsoleOpen] = useState(false)
    const [sidebar_open, setSidebarOpen] = useState(false)
    const [sidebar_selected, setSidebarSelected] = useState('')
    const [code, setCode] = useState('')
    const [compiled_result, setCompiledResult] = useState('')
    const [loading, setLoading] = useState(false)

    const openSideBar = (selected) => {
        (selected == sidebar_selected || !sidebar_open) && setSidebarOpen(!sidebar_open)
        setSidebarSelected(selected)
    }

    const compile = () => {
        setConsoleOpen(true)
        setLoading(true)
        const code_data = new FormData()
        code_data.append('code', code)
        axios.post("http://localhost:8000/api/compile", code_data)
        .then((res) => {
            setLoading(false)
          setCompiledResult(res.data.Result)
        })
        .catch((err) => {
            setLoading(false)
          console.log(err)
        })
    }

    const addTab = (event) => {
        if(event.key === 'Tab') {
            event.preventDefault()
            setCode(code + '    ')
        }
    }
    
    const downloadFile = () => {
        const file = new Blob([code], {type: 'text/plain;charset=utf-8'})
        saveAs(file, 'my_python_code.py')
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1>CODING</h1>
                {signed_in ? <img src={user_photo} className="user-photo"/> : <span>Sign In</span>}
            </div>
            <div className='editor-container'>
                <div className='side-bar'>
                    <img src={search_pic} className="menu-button bright" onClick={() => openSideBar('search')}/>
                    <img src={files_pic} className="menu-button bright" onClick={() => openSideBar('files')}/>
                    <img src={messages_pic} className="menu-button" onClick={() => openSideBar('messages')}/>
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
                    <textarea className='editor-input' placeholder='Write your code here...' value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => addTab(e)} />
                </div>
                <div className={console_open ? 'console-open' : 'console'}>
                    <div className='button-container'>
                        {loading ? <button type='button'><img src={loading_pic} /></button> : <button type='button' onClick={() => compile()}>Run</button>}
                        <button type='button'>Save</button>
                        <button type='button' onClick={() => downloadFile()}>Download</button>
                        {!console_open && <span onClick={() => setConsoleOpen(true)}> Open Console</span>}
                    </div>
                    {console_open && <span onClick={() => setConsoleOpen(false)}>Close Console >> </span>}
                    {console_open && <textarea className='editor-input' value={compiled_result} readOnly></textarea>}
                </div>
            </div>
        </div>
    )
}
