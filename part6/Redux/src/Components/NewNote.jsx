import { useDispatch } from 'react-redux'
import { createNote } from '../Reducers/Reducer'

const NewNote = () => {

  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log("NewNote:",createNote(content))
    dispatch(createNote(content))
   
  }

  return (
  <form className='addForm' onSubmit={addNote}>
    <input className='input'  name="note" /> 
    <button className='btn' type="submit">add</button>
  </form>
  )
}

export default NewNote