import Person from './Person'

const Persons = ({ persons }) => (
  <ul>
    {persons.map(p => (
      <Person key={p.id} person={p} />
    ))}
  </ul>
)

export default Persons
