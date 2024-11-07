import { useState } from 'react'
import Menu from '../Components/Menu'
import About from '../Components/About'
import AnecdoteList from '../Components/AnecdoteList'
import Footer from '../Components/Footer'
import CreateNew from '../Components/CreateNew'
import { Routes, Route } from 'react-router-dom'

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
    <div>
      <h1>Software anecdotes</h1>
      <Menu />      
      <Routes>
        <Route path={'/'} element={<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
        <Route path={'/about'} element={<About/>} />
        <Route path={'/create'} element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
