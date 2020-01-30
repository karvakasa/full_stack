import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const addName = (event) => {
      var names = persons.map((person) => person.name)
      if (names.includes(newName)){
        window.alert(`${newName} is already added to phonebook`);
        event.preventDefault()
      } else {
    
    event.preventDefault()
    console.log('button clicked', event.target)
    const dudeObject = {
        name: newName,
        id: persons.lenght + 1
    }

    setPersons(persons.concat(dudeObject))
    setNewName('')
}
}
const handleDudeChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
}

  return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
            name: 
            <input value={newName} onChange={handleDudeChange}/>
            <br></br>
            <button type="submit">add</button>
        </form>
        <h2>Numbers</h2>
        {persons.map((person, i) => 
        <Person key = {i} person={person}/>
        )}
    </div>
  )
}
const Person = ({ person }) => {
    return (
        <div>
            {person.name}
        </div>
    )
}
export default App