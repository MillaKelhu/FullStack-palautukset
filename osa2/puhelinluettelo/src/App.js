import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonQuery from './components/PersonQuery'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)

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

  const newInformation = (event) => {
    event.preventDefault()
    console.log('submit clicked', event.target)

    const notNameDuplicate = persons.every((person) => newName !== person.name)
    console.log('No name duplicates:', notNameDuplicate)

    const notNumDuplicate = persons.every((person) => newNumber !== person.number)
    console.log('No number duplicates:', notNumDuplicate)

    if (notNameDuplicate && notNumDuplicate ) {
      addPerson()
    } else if (notNameDuplicate === false) {
      console.log('Name', newName, 'is a duplicate')
      updateNumber()
    } else {
      console.log('Number', newNumber, 'is a duplicate')
      window.alert(`${newNumber} is already added to the phonebook`)
    }
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
        .addNew(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setNewMessage(`Added ${newName}`)
      messageTimer()
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName)
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
      setNewMessage(`Updated ${person.name}'s number`)
      messageTimer()
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
      setNewMessage(`Deleted ${person.name}`)
      messageTimer()
    } else {
      console.log('Delete no one')
    }
  }

  const messageTimer = () => {
    setTimeout(() => setNewMessage(null), 3000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={newMessage}/>
      <form>
        show names with 
        <input
        value={newSearch}
        onChange={searchNames}
        />
      </form>
      <h2>Add a new contact</h2>
      <form onSubmit={newInformation}>
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
