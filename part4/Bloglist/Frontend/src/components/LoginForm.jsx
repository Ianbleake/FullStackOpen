import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({userHandler,alertHandler}) => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = async (event)=>{
    event.preventDefault();

    try {

      const user = await loginService.login({username,password})
      blogService.setToken(user.token)
      userHandler(user)
      window.localStorage.setItem('LoggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')
      alertHandler({text:`Welcome ${user.name}`,type:'success'})
      setTimeout(() => {
        alertHandler({text:'',type:''})
      }, 3000);
    } catch (error) {
      console.log(error.response)
      if(error.response.status === 401){
        alertHandler({text:`Usuario y/o contraseña erroneos`,type:''})
        setTimeout(() => {
          alertHandler({text:'',type:''})
        }, 3000);
      }else{
        alertHandler({text:`Something bad happen: ${error}`,type:''})
        setTimeout(() => {
          alertHandler({text:'',type:''})
        }, 3000);
      }
    }
  }

  return (
    <div data-testid='Logform' className="container">
        <input type="checkbox" id="signup_toggle"/>
        <form className="form" onSubmit={handleLogin} >
            <div className="form_front">
                <div className="form_details">Login</div>
                <input value={username} onChange={({target})=>setUsername(target.value)} placeholder="Username" className="input" type="text" />
                <input value={password} onChange={({target})=>setPassword(target.value)} placeholder="Password" className="input" type="password" />
                <button type='submit' className="btn">Login</button>
              
            </div>
        </form>
    </div>
  )
}

export default LoginForm