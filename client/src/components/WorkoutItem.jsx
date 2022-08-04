// libraries
import React from 'react'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
// components
import ExerciseSet from './ExerciseSet'

export default function WorkoutItem ({ id, index, exercise, numSets, workout, setWorkout, moveItem }) {
    const addIcon = <FontAwesomeIcon icon={faPlus} />
    
    const [x, setNumSets] = useState(numSets);

    const addSet = () => {
        const newIter = workout.map((val, i) => {
            if (i == index) {
                val.numSets++
                setNumSets(val.numSets);
            }
        })
    }

    const ref = useRef(null)

    const [{handlerId}, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // items don't replace themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // determine drag-and-drop area
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // determine mouse position
            const clientOffset = monitor.getClientOffset()
            // determine pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex;
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'item',
        item: () => {
            return {id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div className="workout-item" ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <div className="info">
                <h3>{exercise.exercise_name}</h3>
                <p>Remove</p>    
            </div>
            <div className="exercise-sets">
                {[...Array(x)].map((value, i) => {
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