import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const personsToShow = persons
  .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


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
        personService
      .create(dudeObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        
      })
      .catch(error => {
        console.log(error.response.data)
      })


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
  const removePerson = (person) => {
    
    if (window.confirm('delete', person.name)===true){
      personService.remove(person.id)
    }
  }
 
  return (
    <div>
        <h2>Phonebook</h2>
          <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        <h2>add a new</h2>
          <Form addName={addName} newName={newName} handleDudeChange={handleDudeChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2> 
        <Persons personsToShow={personsToShow} removePerson={removePerson}/>
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
      {props.personsToShow.map((person) => 
        <Person key = {person.id} person={person} remove={props.removePerson}/>
        
      )}
    </div>
  )
}
const Person = ({ person, remove}) => {
  return (
      <div>
        {person.name} {person.number}
         <button onClick={() => remove(person)}>
           delete
            </button>
      </div>
      
  )
}
export default App