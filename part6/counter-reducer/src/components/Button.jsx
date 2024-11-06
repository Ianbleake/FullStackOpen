import { useCounterDispatch } from '../context/CounterContext'

const Button = ({ type, action}) => {

  const dispatch = useCounterDispatch()
  return (
    <button className={`btn ${type}`} onClick={() => dispatch({ type: action })}>
      {type === 'mas' ? '+' : type === 'menos' ? '-' : type === 'rest' ? 'Restart' : ''}
    </button>
  )
}

export default Button