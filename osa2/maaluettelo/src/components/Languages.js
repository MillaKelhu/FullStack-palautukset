import React from "react";

const Languages = ({languages}) => {
    return (
        <ul>
            {languages.map(language =>
                <li>{language.name}</li>
            )}
        </ul>
    )
}

export default Languages