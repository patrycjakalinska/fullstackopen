import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { blogLike, removeBlog } from "../reducers/blogReducer"
import { changeNotification } from "../reducers/notificationReducer"

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleLikes = (blog) => {
    dispatch(blogLike(blog))
    dispatch(changeNotification(`You liked ${blog.title} by ${blog.author}`))
  }
  const handleDelete = (blog) => dispatch(removeBlog(blog))

  const loggedUser = useSelector((state) => state.loggedinUser)
  if (!blog) return null

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div className="blog-details--likes">
          <span className="likes-count">{blog.likes}</span> likes
          <button onClick={handleLikes}>like</button>
        </div>
        <div className="blog-details--user">added by: {blog.user.username}</div>
        <div>
          {loggedUser.username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
