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
  
module.exports = {
    totalLikes,
    dummy
}