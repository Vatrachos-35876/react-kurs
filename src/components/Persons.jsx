import Person from './Person'

const Persons = ({ persons, onDeletePerson }) => (
  <ul>
    {persons.map(p => (
      <Person key={p.id} person={p} onDeletePerson={onDeletePerson} />
    ))}
  </ul>
)

export default Persons
