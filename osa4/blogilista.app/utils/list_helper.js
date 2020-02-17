const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const reducer = (acc, blog) => {
        return acc + blog.likes
    }
    return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
    let favorite = ''
    let favolite = 0
    blogs.forEach(blog => {
        if (blog.likes > favolite){
            favorite = blog.title
            favolite = blog.likes
        }
    })
    return favorite , favolite
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let i = 0
    let maxi = 0
    let maxcount = 0
    authors.forEach(author => {
        let count = 0
        blogs.forEach(blog => {
            if (author === blog.author){
                count++
            }
        })
        if (count > maxcount){
            maxcount = count
            maxi = i
        }
        i++
    })
    return authors[maxi], maxi        
}

  
module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    usersInDb,
    mostBlogs
}