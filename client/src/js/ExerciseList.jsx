import '../css/ExerciseList.css';
import ListItem from './ListItem';

const ExerciseList = ({list, workout, setWorkout}) => {
    return (
        <div className="exercise-list">
            <h3>Exercises</h3>
            <div className="container">
                {list.map((cur, index) => {
                    return (
                        <ListItem index={index} key={cur.exercise_id} exercise={cur} workout={workout} setWorkout={setWorkout}></ListItem>
                    )
                })}
            </div>     
        </div>
    );
};

export default ExerciseList;