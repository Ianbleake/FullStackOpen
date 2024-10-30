import '../Styles/index.css'
import '../Styles/App.css'
import { useEffect } from 'react'
import Notes from '../Components/Notes'
import NewNote from '../Components/NewNote'
import VisibilityFilter from '../Components/VisibilityFilter'
import noteService from '../Services/notes'
import { setNotes } from '../Reducers/Reducer'
import { useDispatch } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [])

  return(
    <div className='card' >
      <h1 className='title' >Notes</h1>
      <VisibilityFilter/>
      <div className='notes' >
        <Notes/>
      </div>
      <NewNote/>
    </div>
  )
}

export default App
