
import React from 'react'
import { Alert } from '@mui/material'
import { Container } from '@mui/material'
import Router from './Router/Router'
import { useState } from 'react'
import styled from 'styled-components'

const App = () => {

  const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  `

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <Page className="py-6" >
      <div>
        {(message &&
          <Alert severity="success">
            {message}
          </Alert>
        )}
      </div>
      <Router user={user} login={login} notes={notes} /> 
    </Page> 
  )
}

export default App
