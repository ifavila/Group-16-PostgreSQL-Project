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
    pool.query('SELECT * FROM country ORDER BY cname ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCountriesDes = (request, response) => {
    pool.query('SELECT * FROM country ORDER BY cname DESC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCountriesByRegion = (request, response) => {
    const region = request.query.region
    pool.query('SELECT cname, region FROM country NATURAL JOIN region WHERE region = $1',
    [region],
    (error, results) => {
        if(error){ 
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCountriesByPop = (request, response) => {
    const pop = request.query.population
    pool.query('SELECT cname, population FROM country WHERE population > $1',
    [pop],
    (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCapitals = (request, response) => {
    if(request.query.capChar){
        pool.query('SELECT cname, capname FROM country INNER JOIN capital ON "cname" = "countryoforigin" WHERE capname SIMILAR TO $1',
        [`(${request.query.capChar})%`],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
    else{
        pool.query('SELECT cname, capname FROM country INNER JOIN capital ON "cname" = "countryoforigin"',
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

}

const getCountriesBySubregion = (request, response) => {
    const subregion = request.query.subreg
    pool.query('SELECT cname FROM country, locatedin WHERE country."countryID" = locatedin.countryid AND locatedin.subregion = $1',
    [subregion],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCountriesByLanguage = (request, response) => {
    const language = request.query.language
    pool.query('SELECT cname, languages FROM country WHERE country.languages LIKE $1',
    [`%${language}%`],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const sortByArea = (request, response) => {
    let querystr = ""
    if(request.query.area === 'ascending'){
        querystr = 'SElECT cname, area, region FROM country INNER JOIN locatedin ON "countryID" = "countryid" WHERE region = $1 ORDER BY area ASC'
    }
    else{
        querystr = 'SElECT cname, area, region FROM country INNER JOIN locatedin ON "countryID" = "countryid" WHERE region = $1 ORDER BY area DESC'
    }
    const region = request.query.region
    pool.query(querystr,
    [region],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
    
}

module.exports = {
    getCountriesAsc,
    getCountriesDes,
    getCountriesByRegion,
    getCountriesByPop,
    getCapitals,
    getCountriesBySubregion,
    getCountriesByLanguage,
    sortByArea
}