// libraries
import React from 'react'
import Axios from 'axios'
// components
import eventBus from '../EventBus'

export default function Login ({ onClose, setShowLogin, setLoginStatus }) {

    const setToken = (token) => {
        sessionStorage.setItem('username', document.getElementById('login-username').value)
        sessionStorage.setItem('token', token)
        setLoginStatus(true)
        eventBus.dispatch('exerciseRefresh')
    }

    const handleLogin = () => {
        const username = document.getElementById('login-username').value
        const password = document.getElementById('login-password').value
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

    return (
        <div className="modal-content">
            <h2>User Login</h2>
            <form>
                <input id="login-username" type="text" placeholder="Username*" required/>
                <input id="login-password" type="password" placeholder="Password*" required/>
                <button type="button" onClick={handleLogin}>Log in</button>
            </form>
            <p onClick={() => setShowLogin(false)}>Not a user? Click here to register.</p>
        </div>
    )
}