import { useEffect, useState } from 'react'
import personService from './services/persons'
import { Title } from './components/Title'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Footer from './components/Footer'
import MessageAlert from './components/MessageAlert'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [question, setQuestion] = useState(null)

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
        setMessage(`${newName} updated successfully`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      phone: newPhone
    }
    const existingPerson = persons.find(person => person.name === newName)
    const existingNumber = persons.find(person => person.phone === newPhone)

    if (existingPerson || existingNumber) {
      if (existingPerson && existingNumber) {
        setMessage(`${newName} is already registered with the same phone number`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } if(existingPerson && !existingNumber) {
        setMessage(`${newName} is already registered. Do you want to update the phone number?`)
        setMessageType('warning')
        setQuestion({
          person: existingPerson,
          contactObject: contactObject
        })
      }if(!existingPerson && existingNumber) {
        setMessage(`The number: "${newPhone}" is already registered whit the name: "${existingNumber.name}". Do you want to update the owner of the number?`)
        setMessageType('warning')
        setQuestion({
          person: existingNumber,
          contactObject: contactObject
        })
      }
    } else {
      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setMessage(`${newName} added to the phonebook`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleUpdateResponse = (response) => {
    if (response && question) {
      updateNumber(question.person.id, question.contactObject)
    }
    setQuestion(null)
    setMessage(null)
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error("Unable to delete the person: ", error)
        })
    }
  }

  return (
    <div className='maincontainer'>
      <MessageAlert message={message} type={messageType} onResponse={handleUpdateResponse} />
      <Title text={'Phonebook'} />
      <Filter handle={handleSearch} />
      <PersonForm nameAction={handleName} phoneAction={handlePhone} addAction={addContact} nameState={newName} phoneState={newPhone} />
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
      <Footer />
    </div>
  )
}

export default App
