import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle]= useState('')
  const [newAuthor, setNewAuthor]= useState('')
  const [newUrl, setNewUrl]= useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <div></div>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        <div></div>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        <div></div>
        <button type="submit" id='save-button'>save</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm