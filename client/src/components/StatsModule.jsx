// libraries
import React from 'react'
// components

export default function StatsModule ({ muscleName, numSets }) {

    if (numSets <= 0) {
        return null
    }

    return (
        <div className="stats-module">
            <h3>{muscleName}</h3>
            <p>{numSets}</p>
        </div>
    )
}