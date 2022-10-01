require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3001

morgan.token('body', function (req) {
  return req.body
})
const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    req.method === 'POST' ? JSON.stringify(tokens.body(req)) : '',
  ].join(' ')
})
app.use(logger)

app.use(express.static('build'))

app.get('/info', async (req, res) => {
  const count = await Person.countDocuments()

  const info = `Phonebook has info for ${count} people`
  const date = new Date()
  res.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body

    const person = { name, number }
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      person,
      { new: true, runValidators: true, context: 'query' }
    )

    res.send(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
