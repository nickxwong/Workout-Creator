const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '@Rm74eda',
    database: 'WorkoutCreator',
});

app.get('/exercises', (req, res) => {
    db.query('SELECT exercises.exercise_id, exercises.exercise_name, primary_groups.muscle_name AS primary_muscle, secondary_groups.muscle_name AS secondary_muscle, tertiary_groups.muscle_name AS tertiary_muscle, equipment.equipment_name ' + 
             'FROM exercises ' +
             'INNER JOIN muscle_groups AS primary_groups ON exercises.primary_muscle=primary_groups.muscle_id ' + 
             'LEFT JOIN muscle_groups AS secondary_groups ON exercises.secondary_muscle=secondary_groups.muscle_id ' +
             'LEFT JOIN muscle_groups AS tertiary_groups ON exercises.tertiary_muscle=tertiary_groups.muscle_id ' +
             'INNER JOIN equipment ON exercises.equipment=equipment.equipment_id'
             , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server running!");
});