import { useCounterValue } from '../context/CounterContext'
const Display = () => {

  const counter = useCounterValue()
  return (
    <div className='count' >{counter}</div>
  )
}

export default Display