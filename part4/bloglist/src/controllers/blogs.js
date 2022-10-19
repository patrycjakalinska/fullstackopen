const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blogPost = await Blog.findById(req.params.id)
  if (blogPost) {
    res.json(blogPost)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      console.log('its here')
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes,
    })

    if (blog.title === undefined || blog.url === undefined) {
      res.status(400).end()
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).setDefaultEncoding({ error: 'blog not found' })
  }

  blog.title = req.body.title
  blog.author = req.body.author
  blog.likes = req.body.likes
  blog.url = req.body.url

  const updatedBlog = await blog.save()
  res.send(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  const user = await User.findById(blog.user.toString())

  if (blog.user.toString() !== decodedToken.id) {
    return res
      .status(401)
      .json({ error: 'you do not have permission to do that' })
  }
  user.blogs = user.blogs.filter((b) => !b._id.equals(blog._id))

  await blog.delete()
  await user.save()

  res.status(204).send()
})

module.exports = blogsRouter
