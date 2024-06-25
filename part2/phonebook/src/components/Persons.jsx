import { Title } from "./Title"

const Persons = ({persons, Search})=>{
  return(
    <div>
      <Title text={'Phone numbers'} />
      <ul>
        {persons.map(person=> person.name.match(Search) ? <li key={person.name} >{person.name}: {person.phone}</li> : '' )}
      </ul>
    </div>
  )
}

export default Persons