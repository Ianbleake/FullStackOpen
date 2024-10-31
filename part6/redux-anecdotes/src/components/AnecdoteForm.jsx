import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { SetAlert } from '../reducers/alertReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event)=>{
    event.preventDefault()
    const content = event.target.story.value
    event.target.story.value = ''
    dispatch(create(content))
    dispatch(SetAlert({ text: 'Your anecdote has saved succesful', type: 'success' },5000))
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