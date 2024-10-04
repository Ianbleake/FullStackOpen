import { useState, useEffect } from 'react'
import Note from '../components/Note'
import noteService from '../services/notes'
import { Title } from '../components/Title'
import MessageAlert from '../components/MessageAlert'
import LoginForm from '../components/LoginForm'
import NoteForm from '../components/NoteForm'
import Loader from '../components/Loader'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState({text: '', type: ''})
  const [user, setUser] = useState(null)

  const [showLog, setShowLog] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('LoggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage({text:`Note '${note.content}' was already removed from server`,type: 'error'})
        setTimeout(() => {
          setErrorMessage({text: '', type: ''})
        }, 5000)
      })
  }

  const handleShow =()=> {
    setShowLog(!showLog)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  if(!notes){
      return <Loader/>
  }

  return (
    <div className='bdy'>
      {showLog ? <LoginForm showHandler={handleShow} alertHandler={setErrorMessage} userState={user} userHandler={setUser} /> : ''}
      <Title text={user ? `Notes of ${user.name}`: 'Notes'} />
      {errorMessage.text === '' ? '' :<MessageAlert message={errorMessage.text} type={errorMessage.type} />}
      <div className='buttons'>
        {!user ? <button className='btn' onClick={handleShow}>Login</button> : ''}
        <button className='btn' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul className='tab'>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      { user ? <NoteForm handler={addNote} noteState={newNote} stateHandler={handleNoteChange} /> : '' }
    </div>
  )
}

export default App