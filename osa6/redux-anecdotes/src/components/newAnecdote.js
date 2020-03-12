import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(newAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = ''
    }
    return (
        <form onSubmit={createAnecdote}>
            <h2>create new</h2>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
    )
}
export default NewAnecdoteForm