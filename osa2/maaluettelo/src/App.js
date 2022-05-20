import React, {useState} from 'react'

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')

  const searchCountries = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <form>
        find countries with
        <input 
        value={newSearch}
        onChange={searchCountries}/>
      </form>
    </div> 
  )
}

export default App