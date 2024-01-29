const PORT = process.env.URL || 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.post('/login', async (req,res) => {

    const {user_name, user_pwd} = req.body
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [user_name])

        if(result.rows.length == 0) {
            return res.status(401).json('user not found !!')
        }

        // const isPassword =  bcrypt.compareSync(user_pwd, result.rows[0].user_pwd);
        // if(!isPassword) {
        //     return res.status(403).send('Invalid credentials');
        // }

        if(user_pwd !== result.rows[0].user_pwd){
            return res.status(403).send('Invalid credentials');
        }

         res.status(200).json('user login')
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


app.post('/', async (req,res) => {
    const {model_name, height, width, sold_out, model_desc, model_image} = req.body
    const id = uuidv4()
    try {
        const result = await pool.query('INSERT INTO models(id, model_name, height, width, sold_out, model_desc, model_image) VALUES($1,$2,$3,$4,$5,$6,$7)',
              [id, model_name, height, width, sold_out, JSON.stringify(model_desc), JSON.stringify(model_image)])
        res.status(201).json(result)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


app.get('/getModels', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM models')
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


app.listen(PORT, () => console.log(`listen on ${PORT}`))