

import React, { useState } from 'react'
import blogsService from '../services/blogs'

const AddForm = ({state,stateHandler,showHandler,alertHandler}) => {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [url,setUrl] = useState('');

  const handleChange = (event)=>{
    const {name,value} = event.target;

    if(name==='title'){
      setTitle(value)
    }else if(name==='autor'){
      setAuthor(value)
    }else if(name==='url'){
      setUrl(value)
    }

  }

  const handleSubmit = (event)=>{
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    blogsService
      .create(newBlog)
        .then(returnedBlog => {
          stateHandler(state.concat(returnedBlog))
          showHandler(false)
          alertHandler({text:'New blog added',type:'success'})
          setTimeout(() => {
            alertHandler({text:'',type:''})
          }, 3000);
        })
        .catch(error=>{
          alertHandler({text:`Something bad happen: ${error}`,type:''})
          setTimeout(() => {
            alertHandler({text:'',type:''})
          }, 3000);
        })

  }

  return (
    <form onSubmit={handleSubmit} className="formcontainer">
        
        <div className="formcard">
          <button className='close' onClick={()=>showHandler(false)} >X</button>
            <a className="formtitle">Add a new blog</a>
            <div className="inputBox">
                <input data-testid='title' type="text" name='title' required="required" onChange={handleChange} value={title} />
                <span className="user">Title</span>
            </div>

            <div className="inputBox">
                <input data-testid='autor' type="text" name='autor' required="required" onChange={handleChange} value={author} />
                <span>Author</span>
            </div>

            <div className="inputBox">
                <input data-testid='url' type="text" name='url' required="required" onChange={handleChange} value={url} />
                <span>Url</span>
            </div>

            <button data-testid='create' type='submit' className="enter">Create</button>

        </div>
    </form>
  )
}

export default AddForm