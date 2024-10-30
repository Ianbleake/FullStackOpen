import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { addAlert, clearAlerts } from '../reducers/alertReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(create(event.target.story.value))
    event.target.story.value = ''
    dispatch(addAlert({ text: 'Your anecdote was added successfully!', type: 'success' }));
    setTimeout(() => {
      dispatch(clearAlerts()); 
    }, 5000);
  }

  return (
    <form className='addForm' onSubmit={handleSubmit} >
      <div className="input-container">
        <input placeholder="Add anecdote" name='story' type="text" />
        <button type='submit' className="button">Add</button>
      </div>
    </form>
  )
}

export default AnecdoteForm