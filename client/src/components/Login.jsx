// libraries
import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
// components

export default function Login ({ show, onClose }) {

    const xIcon = <FontAwesomeIcon icon={faXmark}/>

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const setToken = (token) => {
        sessionStorage.setItem('token', token)
    }

    const handleLogin = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.token != null) {
                setToken(response.data.token)
                onClose()
            } else {
                alert("Incorrect username and/or password. Please try again.")
            }
        })
    }

    if (!show) {
        return null
    }

    return (
        <div className="login">
            <div className="close-button" onClick={onClose}>{xIcon}</div>
            <h2>User Login</h2>
            <form>
                <input type="text" placeholder="Username*" required onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password*" required onChange={event => setPassword(event.target.value)}/>
                <button type="button" onClick={(e) => handleLogin(e)}>Log in</button>
            </form>
        </div>
    )
}

