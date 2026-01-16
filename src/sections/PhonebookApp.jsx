import { useState, useEffect } from 'react'
import personService from '../services/personService'
import Notification from '../components/Notification'

const PhonebookApp = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (e) => setFilter(e.target.value)
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const showNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id === existingPerson.id ? response.data : p))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}'s number`)
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }
    
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`)
      })
      .catch(error => {
        showNotification(`Failed to add ${newName}`, 'error')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`)
        })
        .catch(error => {
          showNotification(`${person.name} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Filter</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            fontSize: '14px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            backgroundColor: 'rgba(168, 85, 247, 0.08)',
            color: '#e8def8',
          }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Add a new</h3>
        <form style={{
          background: 'rgba(168, 85, 247, 0.08)',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          maxWidth: '400px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={handleNameChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                color: '#e8def8',
                marginBottom: '10px'
              }}
            />
            <input
              type="text"
              placeholder="Number"
              value={newNumber}
              onChange={handleNumberChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                color: '#e8def8'
              }}
            />
          </div>
          <button
            type="submit"
            onClick={addPerson}
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(135deg, #a855f7, #c084fc)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            add
          </button>
        </form>
      </div>

      <div>
        <h3>Numbers</h3>
        <div style={{
          background: 'rgba(168, 85, 247, 0.08)',
          borderRadius: '10px',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          padding: '20px'
        }}>
          {personsToShow.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {personsToShow.map(person => (
                <li key={person.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
                  marginBottom: '10px'
                }}>
                  <span>{person.name} {person.number}</span>
                  <button
                    onClick={() => deletePerson(person.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#ff6b6b',
                      border: 'none',
                      color: 'white',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#b8a5d1' }}>No persons found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhonebookApp
