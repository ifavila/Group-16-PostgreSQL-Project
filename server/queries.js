require('dotenv').config({path:'./.env'})
const Pool = require('pg').Pool
const pool = new Pool({
    
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    
})

const getCountriesAsc = (request, response) => {
    pool.query('SELECT population, cname FROM country ORDER BY cname ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCountriesDes = (request, response) => {
    pool.query('SELECT population, cname FROM country ORDER BY cname DESC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getCountriesAsc,
    getCountriesDes,
}