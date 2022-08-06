// libraries
import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
// components
import eventBus from '../EventBus'

export default function Dashboard ({ loginStatus, show, setShowDashboard, setWorkout }) {

    const[savedWorkouts, setSavedWorkouts] = useState([])

    useEffect(() => {
        eventBus.on('workoutRefresh', getSavedWorkouts)
        getSavedWorkouts()

        return () => {
            eventBus.remove('workoutRefresh')
        }
    }, [])

    const getSavedWorkouts = () => {
        // since conditional rendering occurs after component is mounted, this will prevent unnecessary backend calls
        if (!loginStatus) {
            return
        }
        const token = sessionStorage.getItem('token')
        Axios.post('http://localhost:3001/getworkouts', {
            token: token,
        }).then((response) => {
            setSavedWorkouts(response.data)
        })
    }

    const loadWorkout = (workout) => {
        setWorkout(JSON.parse(workout))
    }

    if (!show) {
        return null
    }

    return (
        <div onMouseEnter={() => setShowDashboard(true)} onMouseLeave={() => setShowDashboard(false)} className="dashboard">
            <h3>Saved Workouts</h3>
            <ul>
                {savedWorkouts.map((value, i) => {
                    return (
                        <li key={value.workout_id} onClick={() => loadWorkout(value.workout_content)}>{value.workout_name}</li>
                    )
                })}
            </ul>
        </div>
    )
}