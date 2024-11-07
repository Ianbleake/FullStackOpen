import { useParams, Link } from 'react-router-dom'

const Anecdote = ({ anecdotes ,anecdote, voteHandler }) => {
  
  console.log('Anecdotes:',anecdotes)
  console.log('Anecdote:',anecdote)

  const id = useParams().id


  if(anecdotes){
    const story = anecdotes.find( a => a.id === Number(id))
    return(
      <div>
        {story.content}<button onClick={voteHandler} >vote</button>
      </div>
    )
  }

  if(anecdote){
    return (
      <li>
        <Link to={`/anecdotes/${anecdote.id}`} >
          {anecdote.content}<button onClick={voteHandler} >vote</button>
        </Link>
      </li>
    )
  }
}

export default Anecdote