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

app.get('/countries', db.getCountries)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
