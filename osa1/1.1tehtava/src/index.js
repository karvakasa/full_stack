import React from 'react'
import ReactDOM from 'react-dom'





const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Moi päivö tää toimii vielki',
        exercises: 5000000
      }
    ]
  }
  return (
    <div>
    <Course course={course} />
    </div>
  )
}
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
  console.log(parts)
  return (
    <div>
      {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises}/>)}
    </div>
  )
}
const Total = (props) => {
  console.log(props.total)
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

ReactDOM.render(<App />, document.getElementById('root'))