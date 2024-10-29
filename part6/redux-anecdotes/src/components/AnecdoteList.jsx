import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if(state.filter === ''){
      return state.anecdotes
    }
    else{
      const filteredAnecdotes = state.anecdotes.filter(a => 
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      );
      return filteredAnecdotes
    }
  })

  const orderedAnecdotes = [...anecdotes].sort((a, b) => {return b.votes - a.votes})
  const dispatch = useDispatch()
 
  console.log('Store:', anecdotes )

  return (
    <div className='Anecdotes' >
      {orderedAnecdotes.map(anecdote =>
        <div className='anecdote' key={anecdote.id}>
          <div className='text' >
            <p>{anecdote.content}</p>
          </div>
          <div className='votes' >
            <div className='vtcont' >
              <button className='btn vote' onClick={() => dispatch(vote(anecdote.id))}>vote</button>
              <p className='vt'>{anecdote.votes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList