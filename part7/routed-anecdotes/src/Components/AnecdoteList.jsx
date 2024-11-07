import Anecdote from "./Anecdote"

const AnecdoteList = ({anecdotes, setAnecdotes}) => {

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="anecdotes" >
      <h2 className="subtitle">Anecdotes</h2>
      <ul className="list">
        {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} voteHanldler={vote} /> )}
      </ul>
    </div>
  )
}

export default AnecdoteList