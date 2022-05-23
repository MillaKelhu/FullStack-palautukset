import React, {useEffect, useState} from 'react'
import axios from 'axios'

import SearchResult from './components/SearchResult'

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

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

  console.log('render', countries.length, 'countries')

  const searchCountries = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      <form>
        find countries with
        <input 
        value={newSearch}
        onChange={searchCountries}/>
      </form>
      {<SearchResult matches={countriesToShow}/>}
    </div> 
  )
}

export default App