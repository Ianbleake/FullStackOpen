import React, { useState } from 'react'

const Dropeabble = ({ blog }) => {

  const [drop,setDrop] = useState(false);

  const handleDrop = ()=>{
    setDrop(!drop)
  }

  return (
    <div className={`blog ${drop ? 'droped' : '' }`} >
      <div className="info" >
        <h2 className='btitle' >{blog.title}</h2>
        <div className={`fullinfo ${drop ? 'droped' : '' }`} >
          <p className='ifo' >Autor:<span className='if' >{blog.author}</span></p>
          <p className='ifo' >Link:<span className='if' >{blog.url}</span></p>
          <p className='ifo' >Likes:<span className='if' >{blog.likes}</span></p>
          <p className='ifo' >Usuario:<span className='if' >{blog.user.name}</span></p>
        </div>
      </div>

      <label class="label">
          <div class="toggle">
              <input onClick={handleDrop} class="toggle-state" type="checkbox" name="check" value="check" />
              <div class="indicator"></div>
          </div>
      </label>

    </div>  
  )
}

export default Dropeabble