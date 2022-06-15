import React from "react";

const PersonQuery = ({query}) => {
    return (
      <div>
         {query.name} <input
        value={query.value}
        onChange={query.handler}/>
      </div>
    )
  }

export default PersonQuery