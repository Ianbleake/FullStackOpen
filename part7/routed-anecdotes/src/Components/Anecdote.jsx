import { useParams, Link } from 'react-router-dom'

const Anecdote = ({ anecdotes ,anecdote, voteHandler }) => {
  
  console.log('Anecdotes:',anecdotes)
  console.log('Anecdote:',anecdote)

  const id = useParams().id


  if(anecdotes){
    const story = anecdotes.find( a => a.id === Number(id))
    return(
      <div className='anecdote inv' >
        <div className='info' > 
          <div className='element' >{story.content}</div> 
          <div className='element' >{story.author}</div> 
          <div className='element' ><a href={story.info}>INFO</a></div> 
          <div className='element' >{story.votes}</div> 
        </div>
        <button className='btn' onClick={voteHandler} >vote</button>
      </div>
    )
  }

  if(anecdote){
    return (
      <li className='anecdote' >
        <Link to={`/anecdotes/${anecdote.id}`} >
          {anecdote.content}
        </Link>
        <button className='btn' onClick={voteHandler} >vote</button>
      </li>
    )
  }
}

export default Anecdote