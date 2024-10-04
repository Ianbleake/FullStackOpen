import { useState, useEffect, Fragment } from 'react'
import Blog from '../components/Blog'
import '../styles/app.css'
import '../styles/components.css'
import blogService from '../services/blogs'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if(!blogs){
    return <Loader />
  }

  return (
    <Fragment>
    {!user ? <LoginForm userState={user} userHandler={setUser} /> : 
      <div className='card' >
        <h2 className='title' >{user ? `Blogs of ${user.name}` : 'Blogs'}</h2>
        <div className='blogs' >
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    }
    </Fragment>
  )
}

export default App