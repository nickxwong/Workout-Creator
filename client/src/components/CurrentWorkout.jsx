// libraries
import React from 'react'
import { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

// components
import WorkoutItem from './WorkoutItem'

export default function CurrentWorkout ({ workout, setWorkout }) {

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

    return (
        <div className="current-workout">
            <h3>Workout</h3>
            <DndProvider backend={HTML5Backend}>
                <div className="container">
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
        </div>
    )
}