// libraries
import React from 'react'
import Axios from 'axios'
// components

export default function Register ({ onClose, setShowLogin, setLoginStatus }) {

    async function checkIfDuplicate (username) {
        return await Axios.post('http://localhost:3001/duplicate', {
            username: username,
        }).then((response) => {
            return response.data.duplicate
        })
    }

    const setToken = (token) => {
        sessionStorage.setItem('username', document.getElementById('register-username').value)
        sessionStorage.setItem('token', token)
        setLoginStatus(true)
    }

    const handleRegistration = () => {
        const password = document.getElementById('register-password').value
        const repeat = document.getElementById('register-repeat').value
        if (password !== repeat) {
            alert("Passwords don't match. Please try again.")
            return
        } else {
            const username = document.getElementById('register-username').value
            checkIfDuplicate(username).then(function(duplicate) {
                if (duplicate) {
                    alert('That username has already been taken. Please try another one.')
                } else {
                    Axios.post('http://localhost:3001/register', {
                        username: username,
                        password: password,
                    }).then((response) => {
                        setToken(response.data.token)
                        onClose()
                    })  
                }
            })
        }
    }

    return (
        <div className="modal-content">
            <h2>User Registration</h2>
            <form>
                <input id="register-username" type="text" placeholder="Username*" required />
                <input id="register-password" type="password" placeholder="Password*" required />
                <input id="register-repeat" type="password" placeholder="Repeat password*" required />
                <button type="button" onClick={handleRegistration}>Register</button>
            </form>
            <p onClick={() => setShowLogin(true)}>Click here to login.</p>
        </div>
    )
}