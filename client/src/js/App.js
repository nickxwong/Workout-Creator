import { useState } from 'react';
import Axios from 'axios';
import '../css/App.css';
import ExerciseList from './ExerciseList';

function App() {

  const [exerciseList, setList] = useState([]);

  const getExercises = () => {
    Axios.get('http://localhost:3001/exercises').then((response) => {
      setList(response.data)
    })
  }; 

  return (
    <div className="App" onLoad={getExercises()}>
        <ExerciseList list={exerciseList}/>
    </div>
  );
}

export default App;
