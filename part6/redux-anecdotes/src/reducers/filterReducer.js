import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterAnecdotes(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer
