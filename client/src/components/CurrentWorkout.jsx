// libraries
import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
// components
import WorkoutItem from './WorkoutItem'
import StatsModule from './StatsModule'

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

    return (
        <div className="current-workout">
            <h3>Workout</h3>
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
                {muscleGroupDistribution.map(value => {
                    return (
                        <StatsModule muscleName={value.muscleGroup} numSets={value.numSets} />
                    )     
                })}
            </div>  
        </div>
    )
}