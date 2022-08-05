// libraries
import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
// components
import Login from './Login'
import Register from './Register'

export default function Modal ({ show, onClose }) {

    const xIcon = <FontAwesomeIcon icon={faXmark}/>

    const [showLogin, setShowLogin] = useState(true)

    if (!show) {
        return null
    }

    return (
        <div className="modal">
            <div className="close-button" onClick={onClose}>{xIcon}</div>
            {showLogin && <Login onClose={onClose} setShowLogin={setShowLogin} />}
            {!showLogin && <Register onClose={onClose} setShowLogin={setShowLogin}/>}    
        </div>
    )
}


