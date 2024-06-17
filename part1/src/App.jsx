import { useState } from 'react'

const Title = ({text})=>{
  return(
    <h1>{text}</h1>
  )
} 

const Button = ({onClick,text})=>{
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Display = ({text,value}) =>{
  return(
    <p>{text}: {value}</p>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = ()=>{
    setGood(good+1)
  }

  const addNeutral = ()=>{
    setNeutral(neutral+1)
  }

  const addBad=()=>{
    setBad(bad+1)
  }

  return (
    <div>
      <Title text='Give Feedback'/>
      <Button onClick={addGood} text='Good' />
      <Button onClick={addNeutral} text='Neutral' />
      <Button onClick={addBad} text='Bad' />
      <Title text='Statistics'/>
      <Display text='Good' value={good} />
      <Display text='Neutral' value={neutral} />
      <Display text='Bad' value={bad} />
    </div>
  )
}

export default App