// libraries
import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
// components
import Login from './Login'
import Register from './Register'
import eventBus from '../EventBus'

export default function Dashboard ({ showDashboard, loginStatus, setLoginStatus, setWorkout }) {
    
    const[savedWorkouts, setSavedWorkouts] = useState([])
    const[darkMode, setDarkMode] = useState(false)

    const getSavedWorkouts = () => {
        // since conditional rendering occurs after component is mounted, this will prevent unnecessary backend calls
        if (!loginStatus) {
            return
        }
        const token = sessionStorage.getItem('token')
        Axios.post('https://workoutcreator.herokuapp.com/getworkouts', {
            token: token,
        }).then((response) => {
            setSavedWorkouts(response.data)
        })
    }

    const loadWorkout = (workout) => {
        setWorkout(JSON.parse(workout))
    }

    const logoutUser = () => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        setLoginStatus(false)
    }

    useEffect(() => {
        eventBus.on('workoutRefresh', getSavedWorkouts)
        getSavedWorkouts()

        return () => {
            eventBus.remove('workoutRefresh')
        }
    }, [loginStatus])

    if (!showDashboard) {
        return null
    }

    return (
        <div className="dashboard">
            {!loginStatus && <div className="login-content">
                <Login setLoginStatus={setLoginStatus} />
                <Register setLoginStatus={setLoginStatus} />
            </div> }
            {loginStatus && <div className="dashboard-content">
                <h3>{sessionStorage.getItem('username')}</h3>
                <div className="workout-list">
                    <h4>Saved Workouts</h4>
                    <ul>
                        {savedWorkouts.map((value, i) => {
                            return (
                                <li key={value.workout_id} onClick={() => loadWorkout(value.workout_content)}>{value.workout_name}</li>
                            )
                        })}
                    </ul>    
                </div>
                {!darkMode && <button type="button" onClick={() => {
                    document.body.classList.add('dark')
                    setDarkMode(true)
                }}>Dark Mode</button>}
                {darkMode && <button type="button" onClick={() => {
                    document.body.classList.remove('dark')
                    setDarkMode(false)
                }}>Light Mode</button>}
                <button type="button" onClick={logoutUser}>Sign out</button>
            </div>}
        </div>
    )
}