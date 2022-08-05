// libraries
import { useEffect, useState } from 'react'
import Axios from 'axios'
// css
import '../src/css/App.css'
// components
import ExerciseList from './components/ExerciseList'
import CurrentWorkout from './components/CurrentWorkout'
import Modal from './components/Modal'

function App() {
    
    const [exerciseList, setList] = useState([])
    const [currentWorkout, setWorkout] = useState([])
    const [showModal, setShowModal] = useState(false)

    const getExercises = () => {
        Axios.get('http://localhost:3001/exercises').then((response) => {
            setList(response.data)
        })
    }

    // grabs lists of exercises from database on page load
    useEffect(() => {
        getExercises()
    }, [])

    return (
        <div className="app">
            <div className="header">
                <div className="left-section"></div>
                <div className="middle-section">
                    <h1>Workout Creator</h1>
                    </div>
                <div className="right-section">
                    <button onClick={() => setShowModal(true)}>User Login</button>
                </div>
            </div>
            <div className="content">
                <ExerciseList list={exerciseList} workout={currentWorkout} setWorkout={setWorkout} />
                <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout} />    
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}

export default App
