const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * 10000000).toString()
}

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (!person) {
    response.status(404).end()
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  if (!person.number) {
    return response.status(400).json({ error: 'number is missing' })
  }
  const newPersonName = person.name
  if (!newPersonName) {
    return response.status(400).json({ error: 'name is missing' })
  }
  
  if (persons.find(person => person.name === newPersonName)) {
    return response.status(409).json({ error: 'name must be unique' })
  }
  
  person.id = generateId()

  persons.push(person)
  
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})