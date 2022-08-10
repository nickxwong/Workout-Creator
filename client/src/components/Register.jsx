// libraries
import React from 'react'
import Axios from 'axios'
// components

export default function Register ({ setLoginStatus }) {

    const handleRegistration = () => {
        const username = document.getElementById('register-username').value
        const password = document.getElementById('register-password').value
        const repeat = document.getElementById('register-repeat').value
        // check if blank 
        if (username === "" || password === "" || repeat === "") {
            alert('One or more required fields left empty.')
            return 
        }
        if (password !== repeat) {
            alert('Passwords don\'t match. Please try again.')
            return
        } else {
            checkIfDuplicate(username).then(function(duplicate) {
                if (duplicate) {
                    alert('That username has already been taken. Please try another one.')
                } else {
                    Axios.post('https://workoutcreator.herokuapp.com/register', {
                        username: username,
                        password: password,
                    }).then((response) => {
                        setToken(response.data.token)
                    })  
                }
            })
        }
    }

    async function checkIfDuplicate (username) {
        return await Axios.post('https://workoutcreator.herokuapp.com/duplicate', {
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

    return (
        <div className="login-register">
            <h3>Register</h3>
            <form>
                <input id="register-username" type="text" placeholder="Username*" required />
                <input id="register-password" type="password" placeholder="Password*" required />
                <input id="register-repeat" type="password" placeholder="Repeat password*" required />
                <button type="button" onClick={handleRegistration}>Register</button>
            </form>
        </div>
    )
}