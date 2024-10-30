import { useDispatch } from 'react-redux'
import AnecdoteForm from '../components/AnecdoteForm'
import AnecdoteList from '../components/AnecdoteList'
import Filter from  '../components/Filter'
import Notification from '../components/Notification'
import '../Styles/App.css'
import { useEffect } from 'react'
import { setAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../Services/anecdotes'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
        .then(a => dispatch(setAnecdotes(a)))
  },[dispatch])

  return (
    <div className='card shadow' >
      <Notification />
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