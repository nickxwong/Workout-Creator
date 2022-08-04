// libraries
import React from 'react'
// components
import ListItem from './ListItem'

export default function ExerciseList({ list, workout, setWorkout }) {
  return (
    <div className="exercise-list">
        <h3>Exercises</h3>
        <div className="container">
            {list.map((value, i) => {
                return (
                    <ListItem key={value.exercise_id} index={i} exercise={value} workout={workout} setWorkout={setWorkout} />
                )
            })}
        </div>
    </div>
  )
}
