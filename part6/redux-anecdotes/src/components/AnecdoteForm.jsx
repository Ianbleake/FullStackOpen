import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(create(event.target.story.value))
    event.target.story.value = ''
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