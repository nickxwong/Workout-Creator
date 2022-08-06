// libraries
import { useEffect, useState } from 'react'
import Axios from 'axios'
// css
import '../src/css/App.css'
// components
import ExerciseList from './components/ExerciseList'
import CurrentWorkout from './components/CurrentWorkout'
import Modal from './components/Modal'
import Dashboard from './components/Dashboard'

function App() {
    
    const [exerciseList, setList] = useState([])
    const [currentWorkout, setWorkout] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loginStatus, setLoginStatus] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)

    const getExercises = () => {
        Axios.get('http://localhost:3001/exercises').then((response) => {
            setList(response.data)
        })
    }

    // grabs lists of exercises from database on page load
    useEffect(() => {
        getExercises()
    }, [])

    const logoutUser = () => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        setLoginStatus(false)
    }

    return (
        <div className="app">
            <div className="header">
                <div className="left-section"></div>
                <div className="middle-section">
                    <h1>Workout Creator</h1>
                </div>
                <div className="right-section">
                    {!loginStatus && <button onClick={() => setShowModal(true)}>User Login</button>}
                    {loginStatus && <div className="user-info">
                        <h3 onMouseEnter={() => setShowDashboard(true)} onMouseLeave={() => setShowDashboard(false)}>Username: {sessionStorage.getItem('username')}</h3>
                        <p onClick={logoutUser}>Sign out</p> 
                        <Dashboard loginStatus={loginStatus} show={showDashboard} setShowDashboard={setShowDashboard} setWorkout={setWorkout} />
                    </div>}
                </div>
            </div>
            <div className="content">
                <ExerciseList list={exerciseList} workout={currentWorkout} setWorkout={setWorkout} />
                <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout} loginStatus={loginStatus} />    
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} setLoginStatus={setLoginStatus} />
        </div>
    )
}

export default App
