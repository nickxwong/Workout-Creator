// libraries
import React from 'react'
import { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import Axios from 'axios'
// components
import WorkoutItem from './WorkoutItem'
import SaveModal from './SaveModal'
import eventBus from '../EventBus'

export default function CurrentWorkout ({ workout, setWorkout, loginStatus }) {

    const [showModal, setShowModal] = useState(false)

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setWorkout((prevIter) => 
            update(prevIter, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevIter[dragIndex]],
                ],
            }),
        )
    }, [])

    const saveWorkout = () => {
        if (!loginStatus) {
            alert("Please login first before saving a workout.")
            return 
        }
        const workoutName = document.getElementById('name-input').value
        const workoutContent = JSON.stringify(workout)
        Axios.post('https://workoutcreator.herokuapp.com/saveworkout', {
            name: workoutName,
            content: workoutContent,
            token: sessionStorage.getItem('token')
        }).then((response) => {
            if (response.data.success) {
                alert("Workout saved.")
                eventBus.dispatch('workoutRefresh')
            } else {
                alert("Workout save failed")
            }
        })
    }

    const clearWorkout = () => {
        setWorkout([])
        document.getElementById('name-input').value = "Workout"
    }

    return (
        <div className="current-workout">
            <div className="workout-header">
                <div className="workout-name">
                    <h2>Name: </h2>
                    <input id="name-input" type="text" defaultValue="Workout"/>    
                </div>
                <div className="buttons">
                    <button type="button" onClick={() => {
                        if (workout.length > 0) {
                            setShowModal(true)
                        } else {
                            clearWorkout()
                        }
                    }}>Clear</button>
                    <button type="button" onClick={saveWorkout}>Save</button>    
                </div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="workout-container">
                    {workout.map((value, i) => {
                        return (
                            <WorkoutItem key={value.exercise.exercise_id + '/' + i} index={i} 
                                         id={value.exercise.exercise_id + '/' + i} 
                                         exercise={value.exercise} 
                                         setsReps={value.setsReps} 
                                         workout={workout} 
                                         setWorkout={setWorkout} 
                                         moveItem={moveItem} />
                        )
                    })}
                </div>  
            </DndProvider>
            <SaveModal showModal={showModal} setShowModal={setShowModal} clearWorkout={clearWorkout} setWorkout={setWorkout} saveWorkout={saveWorkout} />
        </div>
    )
}