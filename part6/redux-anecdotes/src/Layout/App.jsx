import { useSelector, useDispatch } from 'react-redux'
import { vote, create } from '../reducers/anecdoteReducer'

const App = () => {

  const anecdotes = useSelector(state => state)
  const orderedAnecdotes = anecdotes.sort((a, b) => {return b.votes - a.votes})
  const dispatch = useDispatch()

  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(create(event.target.story.value))
    event.target.story.value = ''
  }
 
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
      <form onSubmit={handleSubmit} >
        <div><input name='story' /></div>
        <button type='submit' >create</button>
      </form>
    </div>
  )
}

export default App