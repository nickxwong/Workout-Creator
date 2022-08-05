const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { subtle } = require('crypto').webcrypto

// const session = require('express-session')
// const path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

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
                console.Console.log(err)
            } else {
                res.send({token: token})
            }
        })})
})

app.listen(3001, () => {
    console.log("Server running!")
});