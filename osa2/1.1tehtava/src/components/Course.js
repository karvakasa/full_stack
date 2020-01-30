import React from 'react'


const Course = (props) => {
    return(
      <div>
        <Header course={props.course}/>
        <Content parts={props.course.parts}/>
        <Total total={props.course.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
    <div>
      <h1>
          {props.course.name}
      </h1>
    </div>
    )
  }
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  const Total = (props) => {
    var sumtotal = props.total.reduce((sum, part) => sum + part.exercises,0)
    return (
      <div>
        <p>
        Number of exercises {sumtotal}
        
        </p>
      </div>
    )
  }
  const Part = (props) => {
      return (
        <div>
          <p>
            {props.part} {props.exercises}
          </p>
        </div>
      )
    }

    export default Course