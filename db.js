const { Pool } = require('pg')
require("dotenv").config()

// const pool = new Pool({
//     user: process.env.USER, 
//     password: process.env.PWD,
//     host: process.env.HOST,
//     database: process.env.DATABSE,
//     port: 5432
// })
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

  pool.connect((err) => {
    if(err) throw err
    console.log("Connect to postgreSQL successfully")
  })


module.exports = pool