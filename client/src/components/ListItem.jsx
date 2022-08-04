// libraries
import React from 'react'
// components

export default function ListItem({ index, exercise, workout, setWorkout }) {
	const addToWorkout = (exercise) => {
		setWorkout([...workout, exercise])
	}

	return (
    	<div className={index === 0 ? "list-item first" : "list-item"} onClick={() => addToWorkout(exercise)}>
    		<h3>{exercise.exercise_name}</h3>
    		<div className="exercise-info"> 
				<p className="equipment">{exercise.equipment_name}</p>
				<p>{exercise.primary_muscle}</p>
				{ exercise.secondary_muscle != null && <p>{exercise.secondary_muscle}</p> }
				{ exercise.tertiary_muscle != null && <p>{exercise.tertiary_muscle}</p> }
      		</div>
    	</div>
  	)
}