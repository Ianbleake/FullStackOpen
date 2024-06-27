import { useEffect, useState } from 'react'
import axios from 'axios'
import { Title } from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Name')
  const [newPhone, setNewPhone] = useState('0000000000')
  const [Search, setSearch] = useState('')

  useEffect(() => {
    console.log('Effect Avtive')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled');
        setPersons(response.data)
        console.log('Render:',persons.length, 'contacts')
      })
  }, []); 

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handlePhone = (event)=>{
    setNewPhone(event.target.value)
  }

  const handleSearch = (event)=> {
    setSearch(event.target.value)
  }

  const addContact = (event)=>{
    event.preventDefault()
    const contactObjet = {
      name: newName,
      phone: newPhone
    }
    if(persons.some(person => person.name === newName) || persons.some(person => person.phone === newPhone )){
      if(persons.some(person => person.name === newName)){
        alert(`${newName} Ya esta registrado`)
        console.error('El nombre ',newName,' ya esta registrado')
      }else{
        alert(`${newPhone} Ya esta registrado`)
        console.error('El numero: ',newPhone,' ya esta registrado')
      }
    }else{
      setPersons(persons.concat(contactObjet))
      setNewName('')
      setNewPhone('')
    }
  }

  return (
    <div>
      <Title text={'Phonebook'} />
      <Filter handle={handleSearch} />
      <PersonForm nameAction={handleName} phoneAction={handlePhone} addAction={addContact} nameState={newName} phoneState={newPhone} />
      <Persons persons={persons} Search={Search}/>
    </div>
  )
}

export default App