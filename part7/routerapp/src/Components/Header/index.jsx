import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import styled from 'styled-components'

const header = ({user}) => {

  const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

  const padding = {
    padding: 5
  }
  
  return (
    <Navigation>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/notes">
          notes
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>   
        {user
          ? <em>{user} logged in</em>
          : <Button color="inherit" component={Link} to="/login">
              login
            </Button>
        }                              
      </Toolbar>
    </Navigation>
  )
}

export default header