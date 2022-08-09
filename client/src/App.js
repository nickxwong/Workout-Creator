// libraries
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
// css
import '../src/css/App.css'
// components
import ExerciseList from './components/ExerciseList'
import ExerciseCreator from './components/ExerciseCreator'
import CurrentWorkout from './components/CurrentWorkout'
import Dashboard from './components/Dashboard'
import WorkoutStats from './components/WorkoutStats'
import eventBus from './EventBus'

function App() {
    
    const [exerciseList, setList] = useState([])
    const [currentWorkout, setWorkout] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)

    const userIcon = <FontAwesomeIcon icon={faUser} />

    const getExercises = () => {        
        Axios.post('http://localhost:3001/getexercises', {
            token: sessionStorage.getItem('token')
        }).then((response) => {
            setList(response.data)
        })
    }

    const loginUser = () => {
        if (sessionStorage.getItem('token') != null) {
            setLoginStatus(true)
            
        }
    }

    // grabs lists of exercises from database on page load
    useEffect(() => {
        eventBus.on('exerciseRefresh', getExercises)
        getExercises()
        loginUser()

        return () => {
            eventBus.remove('exerciseRefresh')
        }
    }, [])

    return (
        <div className="app">
            <div className="header">
                <h1>Workout Creator</h1>
                <div className="user" onMouseEnter={() => setShowDashboard(true)} onMouseLeave={() => setShowDashboard(false)}>
                    <div className="user-icon">{userIcon}</div>
                    <Dashboard showDashboard={showDashboard} loginStatus={loginStatus} setLoginStatus={setLoginStatus} setWorkout={setWorkout} />
                </div>
            </div>
            <div className="content">
                <ExerciseList exerciseList={exerciseList} currentWorkout={currentWorkout} setWorkout={setWorkout} />
                <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout} loginStatus={loginStatus} />
                <ExerciseCreator loginStatus={loginStatus}/>
                <WorkoutStats currentWorkout={currentWorkout} />
            </div>
        </div>
    )
}

export default App
