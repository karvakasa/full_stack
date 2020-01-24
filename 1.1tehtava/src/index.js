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
      }
    ]
  }
  return (
    <div>
    <Header course={course}/>
    <Content parts={course.parts} />
    <Total total={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props.course.name)
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
  console.log('moi')
  return (
    <div>
      <p>
      Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
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