import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event) => {
      console.log(event)
      setValue(0)
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = (type) => {
  // ...
  const [value, setValue] = useState('')
  const onChange = (event) => {
      setValue('')
  }
  return {
      type,
      value,
      onChange
      
  }
}