const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.COUNTRIES,
    password: process.env.PASSWORD,
    port: 5432,
})

const getCountries = (request, response) => {
    pool.query('SELECT population, cname FROM country', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCountries,
}