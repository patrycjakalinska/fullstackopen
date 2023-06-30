import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog post" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div>
        {sortedBlogs.map((blog) => (
          <div
            className="py-8 px-16 my-2 bg-white rounded-xl shadow-md sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            key={blog.id}
          >
            <div className="text-center space-y-2 sm:text-left">
              <p className="text-lg text-black font-semibold">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </p>
              <p className="text-slate-500 font-medium">{blog.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
