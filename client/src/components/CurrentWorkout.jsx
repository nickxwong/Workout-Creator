// libraries
import React from 'react'
// components
import WorkoutItem from './WorkoutItem'

export default function CurrentWorkout ({ workout, setWorkout }) {
    return (
        <div className="current-workout">
            <h3>Workout</h3>
            <div className="container">
                {workout.map((value, i) => {
                    return (
                        <WorkoutItem key={value.exercise_id + '/' + i} index={i} exercise={value} workout={workout} setWorkout={setWorkout} />
                    )
                })}
            </div>
        </div>
    )
}