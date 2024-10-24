import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../Reducers/Reducer'

const Note = ({ note, handleClick }) => {
  return(
    <li className='note' onClick={handleClick} >
      {note.content} 
      {note.important ? <div className='important' >!</div>  : ''}
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
  const notes = useSelector(state => state);

  return(
        <ul className='notescont' >
          {notes.map(note=>
            <Note
              key={note.id}
              note={note}
              handleClick={() =>  dispatch(toggleImportanceOf(note.id))}
            />
          )}
        </ul>
  )
}

export default Notes