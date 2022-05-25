import React from 'react'

const Countries = ({countries, handleShow}) => {
    return countries.map(country =>
        <div>
            <p>{country.name} <button onClick={() => handleShow(country)}>show</button></p>
        </div>
    )
}

export default Countries