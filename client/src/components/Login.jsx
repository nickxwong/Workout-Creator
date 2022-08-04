// libraries
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
// components

export default function Login ({ show, onClose }) {

    const xIcon = <FontAwesomeIcon icon={faXmark}/>

    if (!show) return null
    return (
        <div className="login">
            <div className="close-button" onClick={onClose}>{xIcon}</div>
            <h2>User Login</h2>
            <form action="" method="post">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button>Log in</button>
            </form>
        </div>
    )
}

