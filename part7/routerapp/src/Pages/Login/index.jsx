import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

const Login = (props) => {

  const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
  
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin(username)
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div>
  )
}

export default Login