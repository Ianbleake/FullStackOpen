import { useState, useEffect, Fragment } from 'react'
import Blog from '../components/Blog'
import '../styles/app.css'
import '../styles/components.css'
import blogService from '../services/blogs'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'
import AddForm from '../components/AddForm'
import Alert from '../components/Alert'
import Togglabble from '../components/Togglabble'
import Dropeabble from '../components/Dropeabble'

const App = () => {

  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [showAdd,setShowAdd] = useState(false)
  const [alert,setAlert] = useState({text:'',type:''})

  useEffect(() => {
    blogService.getAll().then(blogs => {
  
      const compare = (a, b) => {
        return b.likes - a.likes; 
      }

      const ordenatedBlogs = blogs.sort(compare);
      
      setBlogs(ordenatedBlogs);
    });
  }, []);
  

  useEffect(() => {
    const userJson = window.localStorage.getItem('LoggedUser');
    if(userJson){
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogout = ()=>{
    setAlert({text:`Good bye! ${user.name}`,type:'info'})
    setTimeout(() => {
      setAlert({text:'',type:''})
    }, 3000);
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
      {alert.text === '' ? '' : <Alert message={alert.text} type={alert.type} />}
      {!user ? (
        <LoginForm userHandler={setUser} alertHandler={setAlert} />
      ) : (
        <div className='bdy'>
          <div className={`card ${showAdd ? 'blur' : ''}`}>
            <h2 className='title'>{user ? `Blogs of ${user.name}` : 'Blogs'}</h2>
            <div className='blogs'>
              {blogs.map((blog) => (
                <Dropeabble key={blog.id} blog={blog} state={blogs} stateHandler={setBlogs} alertHandler={setAlert} /> 
              ))}
            </div>

            <div className='logout'>
              <button className='btn' onClick={handleLogout}>
                LogOut
              </button>
              <Togglabble labelButton='+' click={handleAdd} showState={showAdd} />
            </div>
          </div>
          {showAdd && ( <AddForm state={blogs} stateHandler={setBlogs} showHandler={setShowAdd} alertHandler={setAlert} /> )}
        </div>
      )}
    </Fragment>
  );
  
}

export default App