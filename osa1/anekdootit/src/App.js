import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => (
  <>
    <h2>
      {text}
    </h2>
  </>
)

const Votes = ({votes}) => (
  <>
    This anecdote has {votes} votes!
  </>
)

const MostPopularAnecdote = ({votes, anecdotes}) => {
  const maxVotes = Math.max.apply(Math, votes)
  console.log('Most popular anecdote has', maxVotes, 'votes')
  const index = votes.indexOf(maxVotes)
  const anecdote = anecdotes[index]
  console.log('Most popular anecdote is', anecdote)
  return (
    <>
      {anecdote}
      <p>
        <Votes votes={maxVotes}/>
      </p>
    </>
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const update = [...votes]

  const randomSelect = () => {
    const ceiling = anecdotes.length
    const index = Math.floor(Math.random()*ceiling)
    return (
      setSelected(index)
    )
  }

  const voteAnecdote = (index) => {
    const handler = () => {
      console.log('index is', index)
      update[index] += 1
      setVotes(update)
      console.log('Voted, anecdote', index, 'has now', votes[index], 'votes')
    }
    return handler
  }

  console.log('Rendering anecdote index...', selected)
  console.log('Anecdotes have', votes, 'votes')


  return (
    <div>
      <Header text={'Anecdote of the day'}/>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        <Votes votes={votes[selected]}/>
      </p>
      <Button handleClick={voteAnecdote(selected)} text='vote this anecdote'/>
      <Button handleClick={randomSelect} text={'new anecdote'}/>
      <Header text={'Most popular anecdote'}/>
      <MostPopularAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
