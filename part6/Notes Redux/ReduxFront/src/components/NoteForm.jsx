import React, { useState } from 'react'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: true,
    }

    addNote(noteObject)
    setNewNote('')
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <form className='frm formDiv' onSubmit={handleSubmit}>
      <input className='inpt' value={newNote} onChange={handleChange} />
      <button className='btnin' type='submit'>save</button>
    </form>
  )
}

export default NoteForm