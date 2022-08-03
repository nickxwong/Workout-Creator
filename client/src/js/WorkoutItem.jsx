import '../css/WorkoutItem.css';

const WorkoutItem = ({index, exercise, workout, setWorkout}) => {

    const removeExercise = () => {
        setWorkout(workout.filter((cur, arr_index) => arr_index != index));
    }

    return (
        <div className="workout-item">
            <div className="exercise-info">
                <h3>{exercise.exercise_name}</h3>
                <p className="remove-button" onClick={removeExercise}>Remove</p>
            </div>
        </div>
    )
};

export default WorkoutItem;