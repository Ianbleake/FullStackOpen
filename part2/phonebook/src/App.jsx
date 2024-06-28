import { useEffect, useState } from 'react'
import personService from './services/persons'
import { Title } from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const updateNumber = (id, contactObject) => {
    personService
      .update(id, contactObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewPhone('')
      })
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      phone: newPhone
    }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`El nombre ${newName} ya está registrado. ¿Desea actualizar el número de teléfono?`)) {
        updateNumber(existingPerson.id, contactObject)
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
      <Title text={'Agenda Telefónica'} />
      <Filter handle={handleSearch} />
      <PersonForm 
        nameAction={handleName} 
        phoneAction={handlePhone} 
        addAction={addContact} 
        nameState={newName} 
        phoneState={newPhone} 
      />
      <Persons 
        persons={persons} 
        search={search} 
        deletePerson={deletePerson} 
      />
    </div>
  )
}

export default App
