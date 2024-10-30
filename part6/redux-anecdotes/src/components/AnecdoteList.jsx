import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addAlert, clearAlerts } from '../reducers/alertReducer';

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

  const handleVote = (id) => {
    dispatch(vote(id));
    dispatch(addAlert({ text: 'Your vote was added successfully!', type: 'info' }));
    
    setTimeout(() => {
      dispatch(clearAlerts()); 
    }, 5000);
  }

  return (
    <div className='Anecdotes' >
      {orderedAnecdotes.map(anecdote =>
        <div className='anecdote' key={anecdote.id}>
          <div className='text' >
            <p>{anecdote.content}</p>
          </div>
          <div className='votes' >
            <div className='vtcont' >
              <button className='btn vote' onClick={()=>handleVote(anecdote.id)}>vote</button>
              <p className='vt'>{anecdote.votes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList