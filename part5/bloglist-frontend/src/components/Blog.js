import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }
  return (
    <div className="blog-post">
      <div>
        {blog.title} {blog.author}
      </div>
      <button onClick={() => setDisplayDetails(!displayDetails)}>
        {displayDetails ? 'hide' : 'view'}
      </button>
      {displayDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={() => handleLikes(blog.id)}>like</button>
          </div>
          <div>
            <button onClick={removeBlog}>remove</button>
          </div>
          <div>by: {blog.user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
