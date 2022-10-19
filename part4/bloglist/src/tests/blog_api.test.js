const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})

  const creds = { username: 'username', password: 'password' }
  const { body: user } = await api.post('/api/users').send(creds)
  process.env.USER = JSON.stringify(user)

  const res = await api.post('/api/login').send(creds)
  process.env.TOKEN = res.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjs = helper.initialBlogs.map(
    (b) => new Blog({ ...b, user: JSON.parse(process.env.USER).id })
  )
  await Promise.all(blogObjs.map((b) => b.save()))
})

describe('when there are initially some blog posts', () => {
  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog post', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 is note does not exisit', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })
})

describe('addition of a new blog post', () => {
  test('if token is not provided or invalid exits with status 401 Unauthorized', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlogPost = {
      title: 'Amazing job in Walmart',
      author: 'Edgar Allan Poe',
      url: 'http://google.com',
      likes: 20,
    }

    const res = await api.post('/api/blogs').send(newBlogPost).expect(401)

    expect(res.body.error).toMatch(/token/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('succeeds with a valid blog post', async () => {
    const newBlogPost = {
      title: 'Amazing job in Walmart',
      author: 'Edgar Allan Poe',
      url: 'http://google.com',
      likes: 20,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(newBlogPost.title)
  })

  test('blog post with no likes defined gets the default value', async () => {
    const newBlogPost = {
      title: 'Amazing job in Walmart',
      author: 'Edgar Allan Poe',
      url: 'http://google.com',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('adding blog without title or url gets 400 Bad Request', async () => {
    const newBlogPostWithoutTitile = {
      author: 'Edgar Allan Poe',
      url: 'http://google.com',
      likes: 4,
    }
    const newBlogPostWithoutUrl = {
      title: 'Amazing job in Walmart',
      author: 'Edgar Allan Poe',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlogPostWithoutTitile)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlogPostWithoutUrl)
      .expect(400)
  })
})

describe('updating blog post', () => {
  test('updating number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = { ...blogToUpdate, likes: 100 }

    api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd).not.toContain(blogToUpdate)
  })
})

describe('deletation of a blog post', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
