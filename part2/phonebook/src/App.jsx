import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('Name')

  const handleValue = (event)=>{
    setNewName(event.target.value)
  }

  const addContact = (event)=>{
    event.preventDefault()
    const contactObjet = {
      name: newName
    }
    if(persons.some(person => person.name === newName)){
      alert(`${newName} Ya esta registrado`)
      console.error('El nombre ',newName,' ya esta registrado')
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
          name: <input onChange={handleValue} value={newName} />
        </div>
        <div>
          <button onClick={addContact} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=> <li key={person.name} >{person.name}</li> )}
      </ul>
    </div>
  )
}

export default App