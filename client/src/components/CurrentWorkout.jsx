// libraries
import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import Axios from 'axios'
// components
import WorkoutItem from './WorkoutItem'
import StatsModule from './StatsModule'
import eventBus from '../EventBus'

export default function CurrentWorkout ({ workout, setWorkout, loginStatus }) {

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

    const emptyDistribution = [
        {'muscleGroup': 'Chest', 'numSets': 0},
        {'muscleGroup': 'Mid-to-upper back', 'numSets': 0},
        {'muscleGroup': 'Lats', 'numSets': 0},
        {'muscleGroup': 'Spinal erectors', 'numSets': 0},
        {'muscleGroup': 'Front delts', 'numSets': 0},
        {'muscleGroup': 'Middle delts', 'numSets': 0},
        {'muscleGroup': 'Rear delts', 'numSets': 0},
        {'muscleGroup': 'Biceps', 'numSets': 0},
        {'muscleGroup': 'Triceps', 'numSets': 0},
        {'muscleGroup': 'Forearms', 'numSets': 0},
        {'muscleGroup': 'Quads','numSets': 0},
        {'muscleGroup': 'Hamstrings', 'numSets': 0},
        {'muscleGroup': 'Glutes', 'numSets': 0},
        {'muscleGroup': 'Abductors', 'numSets': 0},
        {'muscleGroup': 'Adductors', 'numSets': 0},
        {'muscleGroup': 'Calves', 'numSets': 0},
        {'muscleGroup': 'Abs', 'numSets': 0},
        {'muscleGroup': 'Obliques', 'numSets': 0},
        {'muscleGroup': 'Neck', 'numSets': 0},
    ]

    const [muscleGroupDistribution, setDistribution] = useState(emptyDistribution)

    useEffect(() => {
        let newIter = emptyDistribution
        workout.forEach(exercise => {
            const numSets = exercise.setsReps.length 
            const primary = exercise.exercise.primary_muscle 
            const secondary = exercise.exercise.secondary_muscle 
            const tertiary = exercise.exercise.tertiary_muscle 
            newIter.forEach(current => {
                if (current.muscleGroup === primary) {
                    current.numSets += numSets
                }
                if (current.muscleGroup === secondary || current.muscleGroup === tertiary) {
                    current.numSets += (0.5 * numSets)
                }
            })
        })
        setDistribution(newIter)
    }, [workout])

    const saveWorkout = () => {
        if (!loginStatus) {
            alert("Please login first before saving a workout.")
            return 
        }
        const workoutName = document.getElementById('name-input').value
        const workoutContent = JSON.stringify(workout)
        Axios.post('http://localhost:3001/saveworkout', {
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

    return (
        <div className="current-workout">
            <div className="options">
                <div className="workout-name">
                    <h3>Name: </h3>
                    <input id="name-input" type="text" defaultValue="Workout"/>    
                </div>
                <button type="button" onClick={saveWorkout}>Save</button>
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
            <div className="stats-container">
                {muscleGroupDistribution.map((value, i) => {
                    return (
                        <StatsModule key={i} muscleName={value.muscleGroup} numSets={value.numSets} />
                    )     
                })}
            </div>  
        </div>
    )
}