// libraries
import React from 'react'
import Axios from 'axios'
import eventBus from '../EventBus'
// components

export default function ExerciseCreator ({ loginStatus }) {
    
    const saveExercise = () => {
        const name = document.getElementById('exercise-name').value
        const equipment = document.getElementById('equipment').value
        const primary = document.getElementById('primary-muscle').value 
        let secondary = document.getElementById('secondary-muscle').value 
        let tertiary = document.getElementById('tertiary-muscle').value
        if (name === "" || equipment === "" || primary === "") {
            alert('One or more required fields left empty.')
            return
        }
        if (secondary === "" || secondary === 0) {
            secondary = null
        }
        if (tertiary === "" || tertiary === 0) {
            tertiary = null
        }
        Axios.post('http://localhost:3001/saveexercise', {
            name: name,
            equipment: equipment,
            primary: primary,
            secondary: secondary,
            tertiary: tertiary,
            token: sessionStorage.getItem('token')
        }).then((response) => {
            if (response.data.success) {
                alert('Exercise saved')
                eventBus.dispatch('exerciseRefresh')
            } else {
                alert('Exercise save failed')
            }
        })
    }

    return (
        <div className="exercise-creator">
            {!loginStatus && <div className="overlay"><p>Please sign in first before creating a custom exercise</p></div>}
            {loginStatus && <div className="creator-content">
                <h3>Create a custom exercise</h3>
                <p>Custom exercises are linked to your account.</p>
                <form>
                    <input id="exercise-name" type="text" placeholder="Name of exercise*"/>
                    <select id="equipment" name="Equipment" defaultValue="">
                        <option value="" disabled>Equipment</option>
                        <option value="1">Bodyweight</option>
                        <option value="2">Dumbbell</option>
                        <option value="3">Free weight</option>
                        <option value="4">Machine (plate-loaded)</option>
                        <option value="5">Machine (pin-loaded)</option>
                        <option value="6">Cable</option>
                        <option value="7">Kettlebell</option>
                        <option value="8">Resistance band</option>
                    </select>
                    <select id="primary-muscle" name="Primary" defaultValue="">
                        <option value="" disabled>Primary muscle group</option>
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
                    <select id="secondary-muscle" name="Secondary" defaultValue="">
                        <option value="" disabled>Additional muscle group (optional)</option>
                        <option value="0">None</option>
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
                    <select id="tertiary-muscle" name="Secondary" defaultValue="">
                        <option value="" disabled>Additional muscle group (optional)</option>
                        <option value="0">None</option>
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
                    <button type="button" onClick={saveExercise}>Create exercise</button>
                </form>
            </div>}
        </div>
    )
}