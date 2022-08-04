// libraries
import { useEffect, useState } from 'react'
import Axios from 'axios'
// css
import '../src/css/App.css'
// components
import ExerciseList from './components/ExerciseList'
import CurrentWorkout from './components/CurrentWorkout'

function App() {

    const [exerciseList, setList] = useState([])
    const [currentWorkout, setWorkout] = useState([])

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
            <ExerciseList list={exerciseList} workout={currentWorkout} setWorkout={setWorkout} />
            <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout} />
        </div>
    )
}

export default App
