const express = require('express')
const app = express()

const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { subtle } = require('crypto').webcrypto

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3001

const db = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
});

app.use(express.static('build'))

app.post('/getexercises', (req, res) => {
    const token = req.body.token
    db.query('SELECT exercises.exercise_id, exercises.exercise_name, primary_groups.muscle_name AS primary_muscle, secondary_groups.muscle_name AS secondary_muscle, tertiary_groups.muscle_name AS tertiary_muscle ' + 
             'FROM exercises ' +
             'INNER JOIN muscle_groups AS primary_groups ON exercises.primary_muscle=primary_groups.muscle_id ' + 
             'LEFT JOIN muscle_groups AS secondary_groups ON exercises.secondary_muscle=secondary_groups.muscle_id ' +
             'LEFT JOIN muscle_groups AS tertiary_groups ON exercises.tertiary_muscle=tertiary_groups.muscle_id ' +
             'WHERE user_token IS NULL OR user_token=?'
             , [token], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/filter', (req, res) => {
    const token = req.body.token
    const muscleGroup = req.body.muscleGroup 
    db.query('SELECT exercises.exercise_id, exercises.exercise_name, primary_groups.muscle_name AS primary_muscle, secondary_groups.muscle_name AS secondary_muscle, tertiary_groups.muscle_name AS tertiary_muscle ' + 
             'FROM exercises ' +
             'INNER JOIN muscle_groups AS primary_groups ON exercises.primary_muscle=primary_groups.muscle_id ' + 
             'LEFT JOIN muscle_groups AS secondary_groups ON exercises.secondary_muscle=secondary_groups.muscle_id ' +
             'LEFT JOIN muscle_groups AS tertiary_groups ON exercises.tertiary_muscle=tertiary_groups.muscle_id ' +
             'WHERE (primary_muscle=? OR secondary_muscle=? OR tertiary_muscle=?) AND (user_token IS NULL OR user_token=?)'
             , [muscleGroup, muscleGroup, muscleGroup, token], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/getworkouts', (req, res) => {
    const token = req.body.token
    db.query('SELECT workouts.workout_name, workouts.workout_content, workouts.workout_id FROM workouts WHERE user_token = ?', [token], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.log(err)
        } else if (result.length > 0) {
            res.send({token: result[0].token})
        } else {
            res.send({token: null})
        }
    })
})

const encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64')
}

async function generateToken(str) {
    const digest = await subtle.digest('SHA-512', new TextEncoder().encode(str))
    return encodeBase64(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

app.post('/duplicate', (req, res) => {
    const username = req.body.username
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            console.log(err)
        } else if (result.length > 0) {
            res.send({duplicate: true})
        } else {
            res.send({duplicate: false})
        }
    })
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password 
    generateToken(username + "" + password).then(token => {
        db.query('INSERT INTO users (username, password, token) VALUES (?, ?, ?)', [username, password, token], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({token: token})
            }
        })})
})

app.post('/saveworkout', (req, res) => {
    const workoutName = req.body.name 
    const workoutContent = req.body.content 
    const userToken = req.body.token 
    db.query('INSERT INTO workouts (workout_name, workout_content, user_token) VALUES (?, ?, ?)', [workoutName, workoutContent, userToken], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({'success': true})
        }
    })
})

app.post('/saveexercise', (req, res) => {
    const name = req.body.name 
    const primary = req.body.primary 
    const secondary = req.body.secondary 
    const tertiary = req.body.tertiary
    const token = req.body.token
    db.query('INSERT INTO exercises (exercise_name, primary_muscle, secondary_muscle, tertiary_muscle, user_token) VALUES (?, ?, ?, ?, ?)', [name, primary, secondary, tertiary, token], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({'success': true})
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return 
    }
    console.log('Server active')
})
