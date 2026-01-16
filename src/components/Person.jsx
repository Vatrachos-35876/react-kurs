const Person = ({ person, onDeletePerson }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => onDeletePerson(person.id)}>delete</button>
  </li>
)

export default Person
