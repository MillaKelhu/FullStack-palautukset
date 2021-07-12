import React from 'react'

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.map(part => part.exercises).reduce(
      (x, y) => x + y, 0)
    console.log(sum)
    return(
      <p><b>total of {sum}</b></p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

export default Course