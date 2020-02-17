const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
    })
})


blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.userId)

    if (!body.url){
        response.status(400).end()
    }
    if (!body.title){
        response.status(400).end()
    }

    if (!body.likes){
        body.likes = 0
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedblog.toJSON())
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})


module.exports = blogsRouter