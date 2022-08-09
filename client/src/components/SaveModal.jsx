// libraries
import React from 'react'
// components

export default function SaveModal ({ showModal, setShowModal, clearWorkout, setWorkout, saveWorkout }) {

    if (!showModal) {
        return null
    }

    return (
        <div className="save-modal">
            <p>Would you like to save your workout first before clearing it?</p>
            <div className="buttons">
                <button type="button" onClick={() => {
                    clearWorkout()
                    setShowModal(false)
                }}>Clear</button>
                <button type="button" onClick={() => {
                    saveWorkout()
                    clearWorkout()
                    setShowModal(false)
                }}>Save</button>    
        </div>
    </div>
    )
}