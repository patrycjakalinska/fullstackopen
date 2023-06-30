import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedinUser)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div className="h-screen bg-slate-50 font-mono">
      {user === null ? (
        <div className="container mx-auto px-6 flex flex-col items-center justify-center h-screen">
          <div className="py-5">
            <h1>log in to application</h1>
          </div>
          <Notification />
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <Navbar username={user.name} />
          <div className="flex flex-col items-center justify-around">
            <div className="text-5xl flex justify-center font-extrabold my-6">
              forum
            </div>
            <Notification />
            <Routes>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/blogs/:id" element={<Blog blogs={blogs} />}></Route>
              <Route path="/" element={<Blogs blogs={blogs} />}></Route>
            </Routes>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
