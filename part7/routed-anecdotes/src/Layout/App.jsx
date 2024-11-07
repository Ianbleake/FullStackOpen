import { useState } from 'react'
import Menu from '../Components/Menu'
import About from '../Components/About'
import AnecdoteList from '../Components/AnecdoteList'
import Footer from '../Components/Footer'
import CreateNew from '../Components/CreateNew'
import { Routes, Route } from 'react-router-dom'
import Anecdote from '../Components/Anecdote'
import '../Styles/App.css'

const App = () => {

  //TODO: const [notification, setNotification] = useState('') 

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  return (
    <>
      <div className='card' >
        <div className='titleContainer' >
          <h1 className='title' >Software anecdotes</h1>  
        </div>   
        <div className='body' >
          <Routes>
            <Route path={'/'} element={<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
            <Route path={'/anecdotes/:id'} element={<Anecdote anecdotes={anecdotes} />} />
            <Route path={'/about'} element={<About/>} />
            <Route path={'/create'} element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <Menu /> 
    </>
  )
}

export default App
