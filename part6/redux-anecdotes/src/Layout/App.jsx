import { useDispatch } from 'react-redux'
import AnecdoteForm from '../components/AnecdoteForm'
import AnecdoteList from '../components/AnecdoteList'
import Filter from  '../components/Filter'
import Notification from '../components/Notification'
import '../Styles/App.css'
import { useEffect } from 'react'
import { initialAnecdotes } from '../reducers/anecdoteReducer'
import { NotificationContextProvider } from '../Context/NotificationContext'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialAnecdotes())
  },[])

  return (
    <NotificationContextProvider>
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
      </NotificationContextProvider>
  )
}

export default App