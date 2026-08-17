const Persons = ({ persons, filterValue, handleDelete }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
      </div>
    ))
}

export default Persons
