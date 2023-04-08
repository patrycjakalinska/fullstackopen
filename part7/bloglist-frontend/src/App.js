import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Blogs from "./components/Blogs"
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
                    <h1>forum</h1>
                    <Notification />
                    <div>
                        {user.name} logged in
                        <button onClick={handleLogout}>logout</button>
                    </div>
                    <Routes>
                        <Route
                            path="/users/:id"
                            element={<User users={users} />}
                        ></Route>
                        <Route
                            path="/users"
                            element={<Users users={users} />}
                        ></Route>
                        <Route path="/" element={<Blogs />}></Route>
                    </Routes>
                </div>
            )}
        </div>
    )
}

export default App
