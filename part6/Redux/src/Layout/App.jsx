import '../Styles/index.css'
import '../Styles/App.css'
import Notes from '../Components/Notes'
import NewNote from '../Components/NewNote'
import VisibilityFilter from '../Components/VisibilityFilter'


const App = () => {

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
