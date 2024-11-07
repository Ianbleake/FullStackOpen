
const Anecdote = ({ key ,anecdote, voteHandler }) => {
  return (
    <li key={key} >{anecdote.content}<button onClick={voteHandler} >vote</button></li>
  )
}

export default Anecdote