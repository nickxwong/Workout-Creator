// libraries
import { useEffect, useState } from 'react'
import Axios from 'axios'
// css
import '../src/css/App.css'
// components
import ExerciseList from './components/ExerciseList'
import CurrentWorkout from './components/CurrentWorkout'
import Login from './components/Login'

function App() {
    
    const [exerciseList, setList] = useState([])
    const [currentWorkout, setWorkout] = useState([])
    const [showLogin, setShowLogin] = useState(false)

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
                    <button onClick={() => setShowLogin(true)}>User Login</button>
                </div>
            </div>
            <div className="content">
                <ExerciseList list={exerciseList} workout={currentWorkout} setWorkout={setWorkout} />
                <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout} />    
            </div>
            <Login show={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    )
}

export default App
