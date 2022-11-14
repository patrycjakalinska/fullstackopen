import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

let timeout = null

export const changeNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => dispatch(setNotification(null)), duration * 1000)
  }
}
export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
