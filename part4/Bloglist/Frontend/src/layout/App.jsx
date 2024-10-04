import { useState, useEffect, Fragment } from 'react'
import Blog from '../components/Blog'
import '../styles/app.css'
import '../styles/components.css'
import blogService from '../services/blogs'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'
import AddForm from '../components/AddForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [showAdd,setShowAdd] = useState(false)

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
    window.localStorage.removeItem('LoggedUser')
    setUser(null)
  }

  const handleAdd = ()=>{
    setShowAdd(true)
  }

  if(!blogs){
    return <Loader />
  }

  return (
    <Fragment>
    {!user ? <LoginForm userState={user} userHandler={setUser} /> :
    <div className='bdy' > 
      <div className={`card ${showAdd ? 'blur' : '' }`} >
        <h2 className='title' >{user ? `Blogs of ${user.name}` : 'Blogs'}</h2>
        <div className='blogs' >
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        {user ? 
          <div className='logout' >
            <button className='btn' onClick={handleLogout} >LogOut</button>
            <button className='btn' onClick={handleAdd} >+</button>
          </div> 
        : ''}
      </div>
      {showAdd ? <AddForm state={blogs} stateHandler={setBlogs} showHandler={setShowAdd} /> : ''}
    </div>  
    }
    </Fragment>
  )
}

export default App