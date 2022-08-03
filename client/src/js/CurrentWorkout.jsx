import '../css/CurrentWorkout.css';
import WorkoutItem from './WorkoutItem';

const CurrentWorkout = ({workout, setWorkout}) => {
    return (
        <div className='current-workout'>
            <h3>Workout</h3>
            <div className="container">
                {workout.map((cur, index) => {
                    return (
                        <WorkoutItem key={cur.exercise_id + '/' + index} index={index} exercise={cur} workout={workout} setWorkout={setWorkout}/>
                    );
                })}
            </div>
        </div>
    )
};

export default CurrentWorkout;