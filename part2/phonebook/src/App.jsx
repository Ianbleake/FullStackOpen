import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '0000000000' }
  ]) 
  const [newName, setNewName] = useState('Name')
  const [newPhone, setNewPhone] = useState('0000000000')

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handlePhone = (event)=>{
    setNewPhone(event.target.value)
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
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleName} placeholder={newName} />
        </div>
        <div>
          number: <input onChange={handlePhone} placeholder={newPhone} maxLength='10'/>
        </div>
        <div>
          <button onClick={addContact} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=> <li key={person.name} >{person.name}: {person.phone}</li> )}
      </ul>
    </div>
  )
}

export default App