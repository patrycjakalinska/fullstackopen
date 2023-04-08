import { useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "./reducers/loginReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/userReducer"

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedinUser)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
          <div className="navigation-panel">
            <Link to="/blogs">blogs </Link>
            <Link to="/users">users </Link>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <h1>forum</h1>
          <Notification />
          <Routes>
            <Route path="/users/:id" element={<User users={users} />}></Route>
            <Route path="/users" element={<Users users={users} />}></Route>
            <Route path="/blogs/:id" element={<Blog blogs={blogs} />}></Route>
            <Route path="/blogs" element={<Blogs blogs={blogs} />}></Route>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
