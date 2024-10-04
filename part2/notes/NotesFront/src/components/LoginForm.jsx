import React, { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'


const LoginForm = ({showHandler,alertHandler,userState,userHandler}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password })
      noteService.setToken(user.token)
      userHandler(user)
      window.localStorage.setItem('LoggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')
      alertHandler({text:`Welcome ${user.name}`,type:'success'})
      setTimeout(() => {
        alertHandler({text: '', type: ''})
      }, 5000)

    }catch(exeption){

      alertHandler({text:'Wrong credentials',type:'error'})
      setTimeout(() => {
        alertHandler({text: '', type: ''})
      }, 5000)

    }finally{
      showHandler()
    }
    
  }

  return (
    <form className='input__container' onSubmit={handleLogin}>
        <div className="shadow__input"></div>
        <button className="input__button__shadow" type='submit' >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="20px" height="20px" >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </button>
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} name="username" className="input__search" placeholder="Username" />
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} name="password" className="input__search" placeholder="Password" />

    </form>
  )
}

export default LoginForm