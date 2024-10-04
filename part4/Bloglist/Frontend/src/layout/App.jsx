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

  useEffect(() => {
    const userJson = window.localStorage.getItem('LoggedUser');
    if(userJson){
      const user = JSON.parse(userJson)
      setUser(user)
    }
  }, []);

  const handleLogout = ()=>{
    window.localStorage.removeItem('LoggedUSer')
    setUser(null)
  }

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
        {user ? <div className='logout center' ><button className='btn' onClick={handleLogout} >LogOut</button></div> : ''}
      </div>
    }
    </Fragment>
  )
}

export default App