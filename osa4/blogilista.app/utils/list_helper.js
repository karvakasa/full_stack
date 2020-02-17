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
  
module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    usersInDb
}