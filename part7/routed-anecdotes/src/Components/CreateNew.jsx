import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/myHooks"

const CreateNew = ({ anecdotes,setAnecdotes }) => {

  const navigate = useNavigate()
  const content = useField('text') 
  const author = useField('text')
  const info = useField('text')

  const addNew = (anecdote) => { 
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })


    navigate('/')
  }

  return (
    <div className="create" >
      <h2 className="subtitle" >create a new anecdote</h2>
      <form className="form" onSubmit={handleSubmit}>

        <div className="brutalist-container">
          <input required placeholder="TYPE HERE" className="brutalist-input smooth-type" {...content} />
          <label className="brutalist-label">CONTENT</label>
        </div>

        <div className="brutalist-container">
          <input required placeholder="TYPE HERE" className="brutalist-input smooth-type" {...author} />
          <label className="brutalist-label">AUTHOR</label>
        </div>

        <div className="brutalist-container">
          <input required placeholder="TYPE HERE" className="brutalist-input smooth-type" {...info} />
          <label className="brutalist-label">INFO</label>
        </div>

        <button className="btn" >create</button>
      </form>
    </div>
  )

}

export default CreateNew