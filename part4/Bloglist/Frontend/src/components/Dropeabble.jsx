import React, { useState } from 'react'
import blogService from '../services/blogs';

const Dropeabble = ({ blog, state, stateHandler }) => {

  const [drop,setDrop] = useState(false);

  const handleDrop = ()=>{
    setDrop(!drop)
  }

  const handleLike = ()=>{

    const likeObjet = {
      ...blog,
      likes: blog.likes+1
    }
    console.log('Request:',likeObjet)
    blogService.update(blog.id,likeObjet)
      .then(returnedBlog =>{
        console.log('Response',returnedBlog)

        const original = state.find( n => n.id === returnedBlog.id )

        console.log('Original:',original)

        const updated = {
          ...original,
          likes: returnedBlog.likes
        }

        console.log('Updated:',updated)

        stateHandler(state.map(b => b.id !== blog.id ? b : updated))
      })
      .catch(error =>{
        console.error('a ver que pedo: ',error)
      })

  }

  return (
    <div className={`blog ${drop ? 'droped' : '' }`} >
      <div className="info" >
        <h2 className='btitle' >{blog.title}</h2>
        <div className={`fullinfo ${drop ? 'droped' : '' }`} >
          <p className='ifo' >Autor:<span className='if' >{blog.author}</span></p>
          <p className='ifo' >Link:<span className='if' >{blog.url}</span></p>
          <p className='ifo'>Likes:<span className='if' >{blog.likes}</span><button onClick={handleLike} >like</button></p>
          <p className='ifo' >Usuario:<span className='if' >{blog.user.name}</span></p>
        </div>
      </div>

      <label className="label">
          <div className="toggle">
              <input onClick={handleDrop} className="toggle-state" type="checkbox" name="check" value="check" />
              <div className="indicator"></div>
          </div>
      </label>

    </div>  
  )
}

export default Dropeabble