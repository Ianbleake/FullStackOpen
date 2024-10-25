import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../Reducers/Reducer'
import { useEffect, useState } from 'react'

const Note = ({ note, handleClick }) => {

  return(
    <li className={`note`} onClick={handleClick} >
      {note.content} 
      {note.important ? <div className='important' >!</div>  : ''}
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.notes
    }
    return state.filter  === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

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