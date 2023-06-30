import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { changeNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (e) {
      changeNotification(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 ml-2 text-sm font-medium text-gray-900 "
            >
              username
            </label>
            <input
              type="text"
              value={username}
              name="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="janedoe"
              id="username"
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              password
            </label>
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="***********"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <button id="login-button" className="bg-blue-100" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
