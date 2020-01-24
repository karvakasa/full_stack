import React, { useState } from 'react'
import ReactDOM from 'react-dom'




  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
  
const App = (props) => {
    const [hyva, sethyva] = useState(0)
    const [vaara, setvaara] = useState(0)
    const [neutral, setneutral] = useState(0)

  
    const handlehyvaClick = () => {
      sethyva(hyva + 1)
    }
    const handleneutralClick = () => {
        setneutral(neutral + 1)
      }
  
    const handlevaaraClick = () => {
      setvaara(vaara + 1)
    }
    const fiidback = 'Give feedback'
    const statistiik = 'Statistics'
    const hyyva = 'good'
    const sveitsi = 'neutral'
    const paha = 'bad'
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
        <div>
        <Header text={fiidback}/>
        
          <Button onClick={handlehyvaClick} text={hyyva} />
          <Button onClick={handleneutralClick} text={sveitsi} />
          <Button onClick={handlevaaraClick} text={paha} />
          
        </div>
        <Header text={statistiik}/>
        good {hyva}
        <div>
        neutral {neutral}    
        </div> 
        bad {vaara}
        <div>
        average {(hyva - vaara)/(hyva + vaara + neutral)}
        </div>
        positive {((hyva)/(hyva+vaara+neutral))*100 } %
        <div>

        </div>
      </div>
    )
  }
  let counter = 1
  
  const refresh = () => {
    ReactDOM.render(<App counter={counter} />, 
    document.getElementById('root'))
  }
  
  setInterval(() => {
    refresh()
    counter += 1
  }, 1000)
