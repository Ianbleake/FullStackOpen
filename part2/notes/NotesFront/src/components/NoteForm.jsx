import React, { useState } from 'react'

const NoteForm = ({ noteState, addNote, alertHandler }) => {
  const [newNote, setNewNote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    addNote(noteObject)
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <form className='frm' onSubmit={handleSubmit}>
      <input className='inpt' value={newNote} onChange={handleNoteChange} />
      <button className='btnin' type='submit'>save</button>
    </form>
  )
}

export default NoteForm