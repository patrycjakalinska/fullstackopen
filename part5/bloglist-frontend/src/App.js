import { useState, useRef, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (setMessage, message) => {
    setMessage(message)
    setTimeout(() => setMessage(''), 5000)
  }

  const blogFormRef = useRef()

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showMessage(setSuccessMessage, 'user logged in!')
    } catch (err) {
      showMessage(setErrorMessage, 'wrong username or password')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    showMessage(
      setSuccessMessage,
      `${user.name}, you have been logged out successfully`
    )
    setUser(null)
  }

  const handleLikes = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)

    const updatedBlog = await blogService.update(id, {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    })

    const updatedBlogList = blogs.map((blog) =>
      blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog
    )
    setBlogs(updatedBlogList)
  }

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blogPost = await blogService.create(blogObj)
      setBlogs(blogs.concat(blogPost))
      showMessage(
        setSuccessMessage,
        `a new blog ${blogObj.title} by ${blogObj.author} added`
      )
    } catch (e) {
      showMessage(setErrorMessage, e.message)
    }
  }

  const removeBlog = async (blogObjectId) => {
    await blogService.remove(blogObjectId)
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogObjectId)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification message={successMessage} type="success" />
          <Notification message={errorMessage} type="error" />
          <Togglable buttonLabel="login">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h1>blogs</h1>
          <Notification message={successMessage} type="success" />
          <Notification message={errorMessage} type="error" />
          <div>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
            <Togglable buttonLabel="new blog post" ref={blogFormRef}>
              <BlogForm addBlog={addBlog} />
            </Togglable>
          </div>
          <Blogs
            blogs={blogs}
            handleLikes={handleLikes}
            handleRemove={removeBlog}
          />
        </div>
      )}
    </div>
  )
}

export default App
