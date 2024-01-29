const { Pool } = require('pg')
require("dotenv").config()

const pool = new Pool({
    user: process.env.USER, 
    password: process.env.PWD,
    host: process.env.HOST,
    database: process.env.DATABSE,
    port: 5432
})


module.exports = pool