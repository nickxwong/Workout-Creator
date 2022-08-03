import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../css/App.css';
import ExerciseList from './ExerciseList';
import CurrentWorkout from './CurrentWorkout';

function App() {

  const [exerciseList, setList] = useState([]);
  const [currentWorkout, setWorkout] = useState([]);
  
  const getExercises = () => {
    Axios.get('http://localhost:3001/exercises').then((response) => {
      setList(response.data)
    });
  }; 

  useEffect(() => {
    getExercises();
  }
  , []);

  return (
    <div className="App">
        <ExerciseList list={exerciseList} workout={currentWorkout} setWorkout={setWorkout}/>
        <CurrentWorkout workout={currentWorkout} setWorkout={setWorkout}/>
    </div>
  );
};

export default App;
