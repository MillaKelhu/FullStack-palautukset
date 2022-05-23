import React from "react";
import Countries from "./Countries";
import Country from "./Country";

const SearchResult = ({matches}) => {
    if (matches.length > 10) {
        return <p>Too many matchers, specify another filter</p>        
    } else if (matches.length === 1) {
        return <Country country={matches[0]}/>
    } else {
        return <Countries countries={matches}/>
    }
}

export default SearchResult