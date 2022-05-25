import React, {useEffect, useState} from 'react'
import axios from 'axios'

import SearchResult from './components/SearchResult'

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])

  const hook = () => {
    console.log('hook')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  console.log('fetched', countries.length, 'countries')
  console.log('render', countriesToShow.length, 'countries')

  const searchCountries = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setCountriesToShow(countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }

  function handleShow(country) {
    console.log(country.name, 'button clicked')
    setCountriesToShow([country])
  }

  return (
    <div>
      <form>
        find countries with
        <input 
        value={newSearch}
        onChange={searchCountries}/>
      </form>
      {<SearchResult matches={countriesToShow} handleShow={handleShow}/>}
    </div> 
  )
}

export default App