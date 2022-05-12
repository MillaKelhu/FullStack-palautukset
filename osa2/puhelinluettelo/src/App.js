import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('Name', newName, 'added')
      console.log('Name', newNumber, 'added')
    } else if (notNameDuplicate === false) {
      console.log('Name', newName, 'is a duplicate')
      window.alert(`${newName} is already added to the phonebook`)
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

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  const searchNames = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
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
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}/>
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )

}

export default App
