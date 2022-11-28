require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')
const db = require('./queries')

app.use(bodyParser.json())
app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, Postgres API' })
})

app.get('/countries/ascending', db.getCountriesAsc)
app.get('/countries/descending', db.getCountriesDes)
//takes a parameter of region
app.get('/countries/region', db.getCountriesByRegion)
//takes a parameter of population
app.get('/countries/population', db.getCountriesByPop)
//takes an optional parameter of capChar
app.get('/countries/capitals', db.getCapitals)
//takes a parameter of subregion
app.get('/countries/subregion', db.getCountriesBySubregion)
//takes a parameter of language
app.get('/countries/language', db.getCountriesByLanguage)
//takes a parameter of region and area
app.get('/countries/region/area', db.sortByArea)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
