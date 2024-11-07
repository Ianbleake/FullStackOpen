import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateNew = ({ anecdotes,setAnecdotes }) => {

  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const addNew = (anecdote) => { 
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div className="create" >
      <h2 className="subtitle" >create a new anecdote</h2>
      <form className="form" onSubmit={handleSubmit}>

        <div className="brutalist-container">
          <input placeholder="TYPE HERE" className="brutalist-input smooth-type" type="text" name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          <label className="brutalist-label">CONTENT</label>
        </div>

        <div className="brutalist-container">
          <input placeholder="TYPE HERE" className="brutalist-input smooth-type" type="text" name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          <label className="brutalist-label">AUTHOR</label>
        </div>

        <div className="brutalist-container">
          <input placeholder="TYPE HERE" className="brutalist-input smooth-type" type="text" name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
          <label className="brutalist-label">INFO</label>
        </div>

        <button className="btn" >create</button>
      </form>
    </div>
  )

}

export default CreateNew