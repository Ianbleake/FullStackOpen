import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('Name')
  const [newPhone, setNewPhone] = useState('0000000000')
  const [Search, setSearch] = useState('')

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
      <h2>Phonebook</h2>
      <form>
        <div>
          Search: <input onChange={handleSearch} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input onChange={handleName} value={newName}/>
        </div>
        <div>
          Phone: <input onChange={handlePhone} value={newPhone} maxLength='10'/>
        </div>
        <div>
          <button onClick={addContact} type="submit">add</button>
        </div>
      </form>
      <h2>Phone Numbers</h2>
      <ul>
        {persons.map(person=> person.name.match(Search) ? <li key={person.name} >{person.name}: {person.phone}</li> : '' )}
      </ul>
    </div>
  )
}

export default App