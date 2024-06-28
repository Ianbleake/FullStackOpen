import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import { Title } from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Name')
  const [newPhone, setNewPhone] = useState('0000000000')
  const [search, setSearch] = useState('')

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handlePhone = (event)=>{
    setNewPhone(event.target.value)
  }

  const handleSearch = (event)=> {
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('Effect Active')
    personService
      .getAll()
        .then(initPersons => {
          console.log('Promise Fullfiled')
          setPersons(initPersons)
        })
  }, []);

  console.log('Render ',persons.length,' Persons')

  const addContact = (event)=>{
    event.preventDefault()
    const contactObject = {
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
    } else {
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`¿Eliminar a ${name}?`)) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error("No se pudo eliminar a la persona: ", error)
        })
    }
  }

  return (
    <div>
      <Title text={'PhoneBook'} />
      <Filter handle={handleSearch} />
      <PersonForm nameAction={handleName} phoneAction={handlePhone} addAction={addContact} nameState={newName} phoneState={newPhone} />
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  )
}

export default App
