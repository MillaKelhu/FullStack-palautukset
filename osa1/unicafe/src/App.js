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

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, sum}) => {
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={(sum/all).toFixed(2)}/>
        <StatisticLine text='positive' value={(good/all*100).toFixed(2) + '%'}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGoodClick = () => {
    setSum(sum + 1)
    return (
      setGood(good + 1)
      )
  }
  const handleNeutralClick = () => {
    return (
      setNeutral(neutral + 1)
      )
  }
  const handleBadClick = () => {
    setSum(sum - 1)
    return (
      setBad(bad + 1)
      )
  }

  const all = good+neutral+bad

  console.log('rendering... good', good, ', neutral', neutral, ', bad', bad, ', all', all)

  return (
    <div>
      <Header text='Give feedback'/>
      <Button handleClick={handleGoodClick} text={"good"} />
      <Button handleClick={handleNeutralClick} text={"neutral"} />
      <Button handleClick={handleBadClick} text={"bad"} />
      <Header text='Statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} sum={sum}/>
    </div>
  )
}

export default App;
