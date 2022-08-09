// libraries
import React from 'react'
// components
import ListItem from './ListItem'

export default function ExerciseList({ exerciseList, currentWorkout, setWorkout }) {
  return (
    <div className="exercise-list">
        <div className="list-header">
            <h2>Exercises</h2> 
            <form>
            <select id="muscle-filter" defaultValue="">
                <option value="" disabled>Muscle group</option>
                <optgroup label="Chest">
                    <option value="1">Chest</option>
                </optgroup>
                <optgroup label="Back">
                    <option value="2">Mid-to-upper back</option>
                    <option value="3">Lats</option>
                    <option value="4">Spinal erectors</option>
                </optgroup>
                <optgroup label="Shoulders">
                    <option value="5">Front delts</option>
                    <option value="6">Middle delts</option>
                    <option value="7">Rear delts</option>
                </optgroup>
                <optgroup label="Arms">
                    <option value="8">Biceps</option>
                    <option value="9">Triceps</option>
                    <option value="10">Forearms</option>
                </optgroup>
                <optgroup label="Legs">
                    <option value="11">Quads</option>
                    <option value="12">Hamstrings</option>
                    <option value="13">Glutes</option>
                    <option value="14">Abductors</option>
                    <option value="15">Adductors</option>
                    <option value="16">Calves</option>
                </optgroup>
                <optgroup label="Misc.">
                    <option value="17">Abs</option>
                    <option value="18">Obliques</option>
                    <option value="19">Neck</option>
                </optgroup>
            </select>
              <button type="button">Filter</button>
            </form>
        </div>
        <div className="list-container">
            {exerciseList.map((value, i) => {
                return (
                    <ListItem key={value.exercise_id} index={i} exercise={value} currentWorkout={currentWorkout} setWorkout={setWorkout} />
                )
            })}
        </div>
    </div>
  )
}
