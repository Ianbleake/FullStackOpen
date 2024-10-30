import AnecdoteForm from '../components/AnecdoteForm'
import AnecdoteList from '../components/AnecdoteList'
import Filter from  '../components/Filter'
import Notification from '../components/Notification'
import store from '../store'
import '../Styles/App.css'

const App = () => {

  const state = store.getState()

  return (
    <div className='card shadow' >
      { state.alert !== null ? <Notification /> : '' }
        <div className='titleContainer'>
          <span className='title' >Anecdotes</span>
          <Filter/>
        </div>
        <div className="AnCont">
          <AnecdoteList/>
        </div>
        <AnecdoteForm/>
    </div>
  )
}

export default App