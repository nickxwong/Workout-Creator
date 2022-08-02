import '../css/ExerciseList.css';
import ListItem from './ListItem';

const ExerciseList = (props) => {
    return (
        <div className="ExerciseList">
            <h3>Exercises</h3>
            <div className="container">
                {props.list.map((val, index) => {
                    return (
                        <ListItem order={index} key={val.exercise_id} name={val.exercise_name} primary={val.primary_muscle} secondary={val.secondary_muscle} tertiary={val.tertiary_muscle} equipment={val.equipment_name}></ListItem>
                    )
                })}
            </div>    
        </div>
    )
};

export default ExerciseList;