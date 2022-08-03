import '../css/ListItem.css';

const ListItem = ({index, exercise, workout, setWorkout}) => {
    const addToWorkout = (name) => {
        setWorkout([...workout, exercise]);
    };

    return (
        <div className={index === 0 ? "list-item first" : "list-item"} onClick={() => addToWorkout(exercise)}>
            <h3>{exercise.exercise_name} <span>({exercise.equipment_name})</span></h3>
            <div className="target-muscles">
                <div className="primary">{exercise.primary_muscle}</div>
                {exercise.secondary_muscle != null &&
                    <div className="secondary">{exercise.secondary_muscle}</div>
                }
                {exercise.tertiary_muscle != null &&
                    <div className="tertiary">{exercise.tertiary_muscle}</div>
                }
            </div>
        </div>
    );
};

export default ListItem;