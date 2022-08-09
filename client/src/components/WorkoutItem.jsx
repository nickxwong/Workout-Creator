// libraries
import React from 'react'
import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
// components
import ExerciseSet from './ExerciseSet'

export default function WorkoutItem ({ id, index, exercise, setsReps, workout, setWorkout, moveItem }) {
    
    const xIcon = <FontAwesomeIcon icon={faX} />
    const addIcon = <FontAwesomeIcon icon={faPlus} />
    
    const [numSets, setNumSets] = useState(setsReps.length);

    const addSet = () => {
        const updatedWorkout = update(workout, {[index]: {setsReps: {$push: [{'set': numSets + 1, 'reps': 0,}]}}})
        setWorkout(updatedWorkout)
        setNumSets(numSets + 1)
    }

    const removeExercise = () => {
        setWorkout(workout.filter((cur, arr_index) => arr_index !== index));
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
                <div className="muscle-groups"> 
                    <p>{exercise.primary_muscle}</p>
                    {exercise.secondary_muscle != null && <p>{exercise.secondary_muscle}</p>}
                    {exercise.tertiary_muscle != null && <p>{exercise.tertiary_muscle}</p>}
      		    </div>
            </div>
            <div className="exercise-sets">
                {[...Array(numSets)].map((value, i) => {
                    return (
                        <ExerciseSet key={i} index={i + 1} exerciseIndex={index} workout={workout} setWorkout={setWorkout} />
                    )
                })}
                <div className="add-button" onClick={addSet}>{addIcon}</div>
            </div>
        </div>
    )
}