import React, { useState } from 'react'
import axios from 'axios'

const Blog = ({ blog, setBlogs, blogs, user }) => {

  const [newView, setNewView] = useState(false)

  const handleBlogView = () => {
    setNewView(!newView)
  }
  const handleLikeButton = () => {
    let id = blog.id
    let author = blog.author
    let title = blog.title
    let likes = blog.likes
    let userId = blog.user.id
    let blogUrl = blog.url
    let Url = 'http://localhost:3001/api/blogs/' + id
    axios({
      method: 'put',
      url: Url,
      data: {
        title: title,
        author: author,
        url: blogUrl,
        likes: likes +1,
        userId: userId
      }
    })
    let newBlogs = blogs.map(blog => {
      if (blog.id === id){
        return { ...blog, likes: blog.likes +1 }
      }
      return blog
    })
    setBlogs(newBlogs)
  }
  const handleDeleteButton = () => {
    let id = blog.id
    let author = blog.author
    let Url= 'http://localhost:3001/api/blogs/'+ id
    const ehto = window.confirm('Remove blog You´re NOT gonna need it! by '+ author)
    if (ehto){
      axios({
        method: 'delete',
        url: Url
      })
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (newView){
    return (
      <li className='blog'>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={handleBlogView}>hide</button>
          <div></div>
          {blog.url}
          <div></div>
          likes {blog.likes}
          <button onClick={handleLikeButton} id='like-button' >like</button>
          <div></div>
          {user.name}
          <div></div>
          <button onClick={handleDeleteButton} id='remove-button' >remove</button>
        </div>
      </li>
    )
  }

  return (
    <li className='blog'>
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleBlogView}id='view-button'>view</button>
      </div>
    </li>
  )
}

export default Blog