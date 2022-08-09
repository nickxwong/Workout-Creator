// libraries
import React from 'react'
import { useState, useEffect } from 'react'
// components
import StatsModule from './StatsModule'

export default function WorkoutStats ({ currentWorkout }) {
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
        currentWorkout.forEach(exercise => {
            const numSets = exercise.setsReps.length 
            const primary = exercise.exercise.primary_muscle 
            const secondary = exercise.exercise.secondary_muscle 
            const tertiary = exercise.exercise.tertiary_muscle 
            newIter.forEach(current => {
                console.log(current.muscleGroup)
                console.log(primary)
                if (current.muscleGroup === primary) {
                    current.numSets += numSets
                }
                if (current.muscleGroup === secondary || current.muscleGroup === tertiary) {
                    current.numSets += (0.5 * numSets)
                }
            })
        })
        setDistribution(newIter)
    }, [currentWorkout])

    return (
        <div className="workout-stats">
            {muscleGroupDistribution.map((value, i) => {
                return (
                    <StatsModule key={i} muscleName={value.muscleGroup} numSets={value.numSets} />
                )     
            })}
        </div>
    )
}