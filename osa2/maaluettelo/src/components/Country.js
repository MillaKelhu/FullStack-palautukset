import React from "react";
import Languages from "./Languages";

const Country = ({country}) => {
    console.log(country)
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            {<Languages languages={country.languages}/>}
            <img src={country.flags.png}></img>
        </div>
    )
}

export default Country