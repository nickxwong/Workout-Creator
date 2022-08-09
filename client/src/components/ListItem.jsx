// libraries
import React from 'react'
// components

export default function ListItem({ index, exercise, currentWorkout, setWorkout }) {
	const addToWorkout = (exercise) => {
		setWorkout([...currentWorkout, {'exercise': exercise, 'setsReps': [{'set': 1, 'reps': '0'}]}])
	}

	return (
    	<div className={index % 2 === 0 ? "list-item even" : "list-item odd"} onClick={() => addToWorkout(exercise)}>
    		<h3>{exercise.exercise_name}</h3>
    		<div className="muscle-groups"> 
				<p>{exercise.primary_muscle}</p>
				{exercise.secondary_muscle != null && <p>{exercise.secondary_muscle}</p>}
				{exercise.tertiary_muscle != null && <p>{exercise.tertiary_muscle}</p>}
      		</div>
    	</div>
  	)
}