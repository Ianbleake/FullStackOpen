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
    <form onSubmit={handleSubmit} >
        <div><input name='story' /></div>
        <button type='submit' >create</button>
    </form>
  )
}

export default AnecdoteForm