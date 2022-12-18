import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      const likedBlog = action.payload
      const { id } = likedBlog
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
      )
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      const { id } = blogToDelete
      return state.filter((blog) => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
      dispatch(deleteBlog(blog))
    }
  }
}

export const blogLike = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.update(blog)
    dispatch(likeBlog(blogToUpdate))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
