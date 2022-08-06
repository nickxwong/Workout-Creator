// libraries
import React from 'react'
// components

export default function ExerciseSet ({ index, exerciseIndex, workout, setWorkout }) {

    const setReps = (repCount) => {
        if (repCount === "") {
            return
        }
        workout.forEach((val, i) => {
            if (i === exerciseIndex) {
                val.setsReps[index - 1].reps = repCount
                setWorkout(workout)
            }
        })
    }

    return (
        <div className="exercise-set">
            <p>{index}</p>
            <input onChange={event => setReps(event.target.value)} defaultValue={workout[exerciseIndex].setsReps[index - 1].reps} onFocus={(e) => e.target.value = ""}></input>
        </div>
    )
}