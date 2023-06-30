import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { redirect } from 'react-router-dom'

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
    addComment(state, action) {
      const { comment } = action.payload
      const blogToComment = action.payload.blog
      return state.map((blog) =>
        blog.id !== blogToComment.id
          ? blog
          : { ...blog, comments: blogToComment.comments.concat(comment) }
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

export const { setBlogs, appendBlog, likeBlog, addComment, deleteBlog } =
  blogSlice.actions

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
      return redirect('/')
    }
  }
}

export const blogLike = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.updateLikes(blog)
    dispatch(likeBlog(blogToUpdate))
  }
}

export const blogComment = (blog, commentToAdd) => {
  return async (dispatch) => {
    const comment = await blogService.createComment(blog, commentToAdd)
    dispatch(addComment({ blog, comment }))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
