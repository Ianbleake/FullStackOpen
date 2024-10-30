import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { addAlert, clearAlerts } from '../reducers/alertReducer'
import anecdoteService from '../Services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event)=>{
    event.preventDefault()
    const newStory = await anecdoteService.createNew(event.target.story.value)
    dispatch(create(event.target.story.value))
    event.target.story.value = ''
    console.log(newStory)
    
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