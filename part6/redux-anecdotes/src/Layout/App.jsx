import AnecdoteForm from '../components/AnecdoteForm'
import AnecdoteList from '../components/AnecdoteList'
import Filter from  '../components/Filter'
import '../Styles/App.css'

const App = () => {

  return (
    <div className='card shadow' >
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