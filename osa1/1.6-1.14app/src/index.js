import React, { useState } from 'react'
import ReactDOM from 'react-dom'




  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
  const StatisticLine = ({text, value}) => {
    return (
      
        <tr>
          <td>
          {text} {value}
          </td>
        </tr>
      
    )
  }
  const Statistics = (props) => {
    const buttons =  props.hyva + props.vaara + props.neutral
      if (buttons === 0) {
        return (
          <div>
            No feedback given
          </div>
        )
      } 
      return (
      <table>
          <tbody>
          <StatisticLine text="good" value ={props.hyva} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.vaara} />
          <StatisticLine text="all" value ={buttons} />
          <StatisticLine text="average" value ={((props.hyva - props.vaara)/buttons)} />
          <StatisticLine text="positive" value ={(props.hyva/buttons)* 100 + '%'} />
          
          </tbody>
      </table>
      
      
      )  
      
  }

  
const App = (props) => {
    const [hyva, sethyva] = useState(0)
    const [vaara, setvaara] = useState(0)
    const [neutral, setneutral] = useState(0)
    const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
    const [vote, setVote] = useState(0)

    const points = new Uint8Array(6);
    
    const copy = [...points]
    
  
    const handlehyvaClick = () => {
      sethyva(hyva + 1)
    }
    const handleneutralClick = () => {
        setneutral(neutral + 1)
      }
  
    const handlevaaraClick = () => {
      setvaara(vaara + 1)
    }
    const handleAnecdoteClick = () => {
      setSelected(Math.floor(Math.random() * 6))
      
    }
    const handleVoteClick = () => {
      setVote(copy[selected] ++ )
      console.log(copy)
      console.log(vote)
      console.log(vote[selected])
    }
    const fiidback = 'Give feedback'
    const statistiik = 'Statistics'
    const hyyva = 'good'
    const sveitsi = 'neutral'
    const paha = 'bad'
    const anekdootti = 'next anecdote'
    const aani = 'Vote'
    const Header = (props) => {
        return (
        <div>
          <h1>
              {props.text}
          </h1>
        </div>
        )
      }

    return (
      <div>
          {props.anecdotes[selected]}
          <div>
            {selected} anekdootti 
            </div>
            <div>
               has {copy[selected]} votes
          </div>
          <Button onClick={handleVoteClick} text={aani}/>
          <Button onClick={handleAnecdoteClick} text={anekdootti}/>
          <Header text={fiidback}/>
        
          <Button onClick={handlehyvaClick} text={hyyva} />
          <Button onClick={handleneutralClick} text={sveitsi} />
          <Button onClick={handlevaaraClick} text={paha} />
          <Header text={statistiik}/>
          <Statistics hyva={hyva} neutral={neutral} vaara={vaara}/>
          
          
      </div>
        )
  }
  const anecdotes = ['If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.']
  
  
    ReactDOM.render(
    <App anecdotes={anecdotes} />, 
    document.getElementById('root'))
  
  
  
