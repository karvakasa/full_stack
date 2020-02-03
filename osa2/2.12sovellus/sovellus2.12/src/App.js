import React, { useState, useEffect } from 'react'
import Axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [countries, setCountries] = useState([{}])
  
  const hook = () => {
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }
    useEffect(hook, []);

  const personsToShow = persons
  .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const countriesToShow = countries
  .filter(function(maa){
    console.log()
    if (newFilter === ''){
      return (maa.name)
    }
    return (newFilter.includes(maa.name))
  })

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
            number: newNumber
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
          <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
          <Countrys countriesToShow={countriesToShow}/>
    </div>
  )
}
const Countrys = ( props ) => {
  return (
      <div>
          {props.countriesToShow.map((country, i) => 
            <Country key = {i} country={country}/>
          )}
      </div>
  )
}
const Country = ({ country }) => {
  return (
    <div>
      {country.name}
    </div>
  )
}
const Filter = ( props ) => {
  
  return(
    <div>
            find countries 
            <input  value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
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
const Person = ({ person }) => {
  return (
      <div>
          {person.name} {person.number}
      </div>
  )
}
export default App