import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import React from 'react'
import Home from '../../Pages/Home'
import Notes from '../../Pages/Notes'
import Note from '../../Pages/Notes/components/Note'
import Users from '../../Pages/Users'
import Login from '../../Pages/Login'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

const Router = ({notes,user,login}) => {

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Router