import React from 'react'
import NewAnecdote from './components/newAnecdote'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
const App = () => {
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <NewAnecdote/>
    </div>
  )
}
export default App