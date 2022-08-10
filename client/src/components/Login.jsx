// libraries
import React from 'react'
import Axios from 'axios'
// components
import eventBus from '../EventBus'

export default function Login ({ setLoginStatus }) {

    const handleLogin = () => {
        const username = document.getElementById('login-username').value
        const password = document.getElementById('login-password').value
        // check if blank
        if (username === "" || password === "") {
            alert("One or more required fields left empty.")
            return
        }
        Axios.post('https://workoutcreator.herokuapp.com/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.token != null) {
                setToken(response.data.token)
            } else {
                alert("Incorrect username and/or password. Please try again.")
            }
        })
    }

    const setToken = (token) => {
        sessionStorage.setItem('username', document.getElementById('login-username').value)
        sessionStorage.setItem('token', token)
        setLoginStatus(true)
        eventBus.dispatch('workoutRefresh')
        eventBus.dispatch('exerciseRefresh')
    }

    return (
        <div className="login-register">
            <h3>Login</h3>
            <form>
                <input id="login-username" type="text" placeholder="Username*" required/>
                <input id="login-password" type="password" placeholder="Password*" required/>
                <button type="button" onClick={handleLogin}>Log in</button>
            </form>
        </div>
    )
}