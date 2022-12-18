import { useRef, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedinUser)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <h1>forum</h1>
          <Notification />
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="new blog post" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </div>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
