import { useDispatch } from 'react-redux'
import { createNote } from '../Reducers/Reducer'
import noteService from '../Services/notes'

const NewNote = () => {

  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
  <form className='addForm' onSubmit={addNote}>
    <input className='input'  name="note" required/> 
    <button className='btn' type="submit">add</button>
  </form>
  )
}

export default NewNote