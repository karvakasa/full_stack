import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const personsToShow = persons
  .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addName = (event) => {
      var names = persons.map((person) => person.name)
      if (newName === ''){
        window.alert('write something first')
        event.preventDefault()
        return
      } 

      if (names.includes(newName)){
        window.alert(`${newName} is already added to phonebook`);
        event.preventDefault()
      } else {
    
        event.preventDefault()
        const dudeObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        setPersons(persons.concat(dudeObject))
        setNewNumber('')
        setNewName('')
      }
  }

  const handleDudeChange = (event) => {
      setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
 
  return (
    <div>
        <h2>Phonebook</h2>
          <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        <h2>add a new</h2>
          <Form addName={addName} newName={newName} handleDudeChange={handleDudeChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2> 
        <Persons personsToShow={personsToShow}/>
    </div>
  )
}
const Person = ({ person }) => {
    return (
        <div>
            {person.name} {person.number}
        </div>
    )
}
const Filter = ( props ) => {
  
  return(
    <div>
            filter shown with
            <input  value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}
const Form = ( props ) => {
  
  return (
    <form onSubmit={props.addName}>
      name: 
      <input value={props.newName} onChange={props.handleDudeChange}/>
      <div></div>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange}/>
      <br></br>
      <button type="submit">add</button>
    </form>
  )
}
const Persons = ( props ) => {
  return(
    <div>
      {props.personsToShow.map((person, i) => 
        <Person key = {i} person={person} />
      )}
    </div>
  )
}
export default App