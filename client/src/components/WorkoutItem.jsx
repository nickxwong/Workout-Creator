// libraries
import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
// components
import ExerciseSet from './ExerciseSet'

export default function WorkoutItem ({ index, exercise, workout, setWorkout }) {
    const addIcon = <FontAwesomeIcon icon={faPlus} />
    
    const [numSets, setNumSets] = useState(0);

    const addSet = () => {
        setNumSets(numSets + 1);
    }

    return (
        <div className="workout-item">
            <div className="info">
                <h3>{exercise.exercise_name}</h3>
                <p>Remove</p>    
            </div>
            <div className="exercise-sets">
                {[...Array(numSets)].map((value, i) => {
                    return (
                        <ExerciseSet key={i} index={i + 1} />
                    )
                })}
                <div className="add-button" onClick={addSet}>{addIcon}</div>
            </div>
        </div>
    )
}

// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import '../css/WorkoutItem.css';
// import ExerciseSet from '../js/ExerciseSet';

// const WorkoutItem = ({index, exercise, num_sets, workout, setWorkout}) => {

//     const addIcon = <FontAwesomeIcon icon={faPlus} />

//     const [numSets, setNumSets] = useState(0);

//     const removeExercise = () => {
//         setWorkout(workout.filter((cur, arr_index) => arr_index !== index));
//     }

//     const addSet = () => {
//         setNumSets(numSets + 1);
//         console.log(workout);
//     }
    
//     return (
//         <div className="workout-item">
//             <div className="exercise-info">
//                 <h3>{exercise.exercise_name}</h3>
//                 <p className="remove-button" onClick={removeExercise}>Remove</p>
//             </div>
//             <div className="workout-sets">
//                 {[...Array(numSets)].map((value, index) => {
//                     return(
//                         <ExerciseSet key={index} index={index + 1}/>
//                     );
//                 })}
//                 <div className="add-button" onClick={addSet}>{addIcon}</div>
//             </div>
//         </div>
//     )
// };

// export default WorkoutItem;