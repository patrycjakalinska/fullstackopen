import React, { useRef } from "react"
import { Link } from "react-router-dom"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog post" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h2>bloglist</h2>

      <div className="blogs">
        {sortedBlogs.map((blog) => (
          <div className="blog-post" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
