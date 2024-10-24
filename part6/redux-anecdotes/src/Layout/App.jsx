import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import AnecdoteForm from '../components/AnecdoteForm'

const App = () => {

  const anecdotes = useSelector(state => state)
  const orderedAnecdotes = anecdotes.sort((a, b) => {return b.votes - a.votes})
  const dispatch = useDispatch()
 
  console.log('Store:', anecdotes )

  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App