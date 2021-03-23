const MergeSort = require('./mergeSort')

const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')

app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

/* Middleware*/
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.post('/process', (request, response) => {
    const body = request.body
    
    if(!body.arrayData) 
        response.status(404).end()
    else {
        mergeSort = new MergeSort(body.arrayData)
        if(mergeSort.isValid())
            response.json(mergeSort.getContent())
        else
            response.status(404).end()
    }
        
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
  

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})