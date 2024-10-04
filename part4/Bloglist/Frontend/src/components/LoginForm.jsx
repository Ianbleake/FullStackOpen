import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({userState,userHandler,alertHandler}) => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = async (event)=>{
    event.preventDefault();

    try {

      const user = await loginService.login({username,password})
      userHandler(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      
    }
  }

  return (
    <div class="container">
        <input type="checkbox" id="signup_toggle"/>
        <form class="form" onSubmit={handleLogin} >
            <div class="form_front">
                <div class="form_details">Login</div>
                <input value={username} onChange={({target})=>setUsername(target.value)} placeholder="Username" class="input" type="text" />
                <input value={password} onChange={({target})=>setPassword(target.value)} placeholder="Password" class="input" type="password" />
                <button type='submit' class="btn">Login</button>
                
                {/* <span class="switch">Don't have an account? 
                    <label class="signup_tog" for="signup_toggle">
                        Sign Up
                    </label>
                </span> */}
              
            </div>
            <div class="form_back">
                <div class="form_details">SignUp</div>
                <input placeholder="Firstname" class="input" type="text" disabled />
                <input placeholder="Username" class="input" type="text" disabled />
                <input placeholder="Password" class="input" type="text" disabled />
                <input placeholder="Confirm Password" class="input" type="text" disabled />
                <button class="btn">Signup</button>
                <span class="switch">Already have an account? 
                    <label class="signup_tog" for="signup_toggle">
                        Sign In
                    </label>
                </span>
            </div>
        </form>
    </div>
  )
}

export default LoginForm