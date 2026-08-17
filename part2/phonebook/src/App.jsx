import { useEffect, useState } from 'react'

import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import Notification from "./components/Notification.jsx"
import personService from "./services/person.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notify, setNotify] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons)
      })
  }, [])
  
  const handleCreate = (e) => {
    e.preventDefault()
    
    const existingPersonByName = persons.find((person) => person.name === newName)
    if (existingPersonByName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPersonByName.id, { ...existingPersonByName, number: newNumber })
          .then((updatedPerson) => {
            console.log('updatedPerson',updatedPerson)
            setPersons((current) => current.map(person => person.id === existingPersonByName.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          setNotify({
            message: `Added ${newPerson.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotify(null)
          }, 5000)
          setPersons((current) => ([...current, newPerson]))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id)
    
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          setNotify({
            message: `Information of ${person.name} has already been removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setNotify(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={notify ? notify.message : null} type={notify ? notify.type : null} />
      
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      
      <h3>Add a new</h3>
      
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleCreate={handleCreate}
      />
      
      <h3>Numbers</h3>
      
      <Persons persons={persons} filterValue={filterValue} handleDelete={handleDelete} />
    </div>
  )
}

export default App