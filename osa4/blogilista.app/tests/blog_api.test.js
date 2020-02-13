const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Blogini',
        author: 'Keijo Keijonen',
        url: 'keijon_netti_sivut.com',
        likes: 69
    },
    {
        title: 'usko, rauha ja lapio',
        author: 'Suomalainen',
        url: 'miesTuliKauppaanLapio.com',
        likes: 213
    },
]
beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(2)
})
  
test('the first blog is about Keijo', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].author).toBe('Keijo Keijonen')
})
test('all Blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const authors = response.body.map(r => r.author)
  
    expect(authors).toContain(
        'Keijo Keijonen'
    )
})
test('adding a blog', async () => {
    const newBlog = {
        title: 'uusi blogi',
        author: 'no Topias tietenkin',
        url: 'www.HYn_hikimaja.com',
        likes: 20
    }
    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    const authors = res.body.map(r => r.author)

    expect(res.body.length).toBe(initialBlogs.length + 1)
    expect(authors).toContain(
        'no Topias tietenkin'
    )
})
test('everyone got likes or its zero', async () => {
    const newBlog = {
        title: 'uusi blogi',
        author: 'no Topias tietenkin',
        url: 'www.HYn_hikimaja.com',
        likes: null
    }
    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    expect(res.body[res.body.length-1].likes).toBe(0)
})
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

test('likes can be edited', async () => {
    const newBlog = {
        title: 'uusi blogi',
        author: 'no Topias tietenkin',
        url: 'www.HYn_hikimaja.com',
        likes: 200
    }
    blogsAtStart = await blogsInDb()
    editBlog = blogsAtStart[0].id
    await api 
        .put(`/api/blogs/${editBlog}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
})



afterAll(() => {
    mongoose.connection.close()
})