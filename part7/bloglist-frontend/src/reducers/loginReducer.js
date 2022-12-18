import loginService from '../services/login'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const loggedUserJSON = JSON.parse(
  window.localStorage.getItem('loggedBlogappUser')
)

if (loggedUserJSON) blogService.setToken(loggedUserJSON.token)

const loginSlice = createSlice({
  name: 'login',
  initialState: loggedUserJSON ? loggedUserJSON : null,
  reducers: {
    userLogin(state, action) {
      blogService.setToken(action.payload.token)
      return action.payload
    },
    userLogout(state) {
      state = null
      return state
    },
  },
})

export const { userLogin, userLogout } = loginSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    console.log(user)
    dispatch(userLogin(user))
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return (dispatch) => {
    dispatch(userLogout())
  }
}

export default loginSlice.reducer
