import React from 'react'

const Countries = ({countries}) => {
    return countries.map(country =>
        <p>{country.name}</p>
    )
}

export default Countries