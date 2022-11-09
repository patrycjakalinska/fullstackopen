import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleLikes, handleRemove }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>bloglist</h2>

      <div className="blogs">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
