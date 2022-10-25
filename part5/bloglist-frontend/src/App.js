import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
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

  const addBlog = async (blogObj) => {
    try {
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

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification message={successMessage} type="success" />
          <Notification message={errorMessage} type="error" />
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h1>blogs</h1>
          <Notification message={successMessage} type="success" />
          <Notification message={errorMessage} type="error" />
          <div>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
            <BlogForm addBlog={addBlog} />
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
