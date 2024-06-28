import Button from "./Button"
import { Title } from "./Title"

const Persons = ({ persons, search, deletePerson }) => {
  return (
    <div>
      <Title text={'Números de Teléfono'} />
      <ul>
        {persons
          .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
          .map(person => (
            <li key={person.id}>
              {person.name}: {person.phone} 
              <Button handle={() => deletePerson(person.id, person.name)} text={'Delete'} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Persons
