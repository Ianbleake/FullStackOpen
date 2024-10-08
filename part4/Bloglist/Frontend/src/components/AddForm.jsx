

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
    <form onSubmit={handleSubmit} class="formcontainer">
        
        <div class="formcard">
          <button className='close' onClick={()=>showHandler(false)} >X</button>
            <a class="formtitle">Add a new blog</a>
            <div class="inputBox">
                <input type="text" name='title' required="required" onChange={handleChange} value={title} />
                <span class="user">Title</span>
            </div>

            <div class="inputBox">
                <input type="text" name='autor' required="required" onChange={handleChange} value={author} />
                <span>Author</span>
            </div>

            <div class="inputBox">
                <input type="text" name='url' required="required" onChange={handleChange} value={url} />
                <span>Url</span>
            </div>

            <button type='submit' class="enter">Create</button>

        </div>
    </form>
  )
}

export default AddForm