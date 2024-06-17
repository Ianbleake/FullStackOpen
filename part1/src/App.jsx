import { useState } from 'react';

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

const Display = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  );
}

const Statistics = ({good,neutral,bad,all,average,percentage})=>{
  if(all == 0){
    return(
      <p>No Feedback given</p>
    )
  }else{
    return(
      <div>
        <Display text='Good' value={good} />
        <Display text='Neutral' value={neutral} />
        <Display text='Bad' value={bad} />
        <Display text='All' value={all} />
        <Display text='Average' value={average} />
        <Display text='Positive' value={`${percentage} %`} />
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const addGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  const average = all === 0 ? 0 : (good - bad) / all;
  const positivePercentage = all === 0 ? 0 : (good * 100) / all;

  return (
    <div>
      <Title text='Give Feedback' />
      <Button onClick={addGood} text='Good' />
      <Button onClick={addNeutral} text='Neutral' />
      <Button onClick={addBad} text='Bad' />
      <Title text='Statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percentage={positivePercentage} />
    </div>
  );
}

export default App;
