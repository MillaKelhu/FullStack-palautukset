import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonQuery from './components/PersonQuery'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const hook = () => {
    console.log('effect is being used')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('persons fetched')
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('submit clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }

    const notNameDuplicate = persons.every((person) => newName !== person.name)
    console.log('No name duplicates:', notNameDuplicate)

    const notNumDuplicate = persons.every((person) => newNumber !== person.number)
    console.log('No number duplicates:', notNumDuplicate)

    if (notNameDuplicate && notNumDuplicate ) {
      personService
        .addNew(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      console.log('Name', newName, 'added')
      console.log('Name', newNumber, 'added')
    } else if (notNameDuplicate === false) {
      console.log('Name', newName, 'is a duplicate')
      const duplicate = findDuplicate(newName)
      updateNumber(duplicate, newNumber)
    } else {
      console.log('Number', newNumber, 'is a duplicate')
      window.alert(`${newNumber} is already added to the phonebook`)
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const findDuplicate = (name) => {
    const duplicate = persons.find(p => p.name === name)
    return duplicate
  }

  const updateNumber = (person, newNumber) => {
    console.log(`update number of ${person.id}`)
    const confirmation = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    if (confirmation) {
      console.log(`update number of ${person.id}`)
      const updatedPerson = {...person, number: newNumber}
      personService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      console.log(`don't update anything`)
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  const searchNames = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const queries = [
    { name: 'name', value: newName, handler: handleNewName },
    { name: 'number', value: newNumber, handler: handleNewNumber}
  ]

  const deletePerson = (person) => {
    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      console.log(`Delete person ${person.id}`)
      personService
        .deleteObject(person.id)
        .then(hook)
    } else {
      console.log('Delete no one')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        show names with 
        <input
        value={newSearch}
        onChange={searchNames}
        />
      </form>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        {queries.map(query =>
          <PersonQuery key={query.name} query={query}/>)}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {<Persons
        persons={personsToShow}
        deletePerson={deletePerson}/>}
    </div>
  )

}

export default App
