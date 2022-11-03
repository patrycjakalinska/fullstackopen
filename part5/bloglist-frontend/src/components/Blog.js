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
      <div className="blog-title">{blog.title} </div>
      <div className="blog-author">{blog.author}</div>
      <button className="blog--view-detials" onClick={() => setDisplayDetails(!displayDetails)}>
        {displayDetails ? 'hide' : 'view'}
      </button>
      {displayDetails && (
        <div className="blog-details">
          <div className="blog-details--url">{blog.url}</div>
          <div className="blog-details--likes">
            likes: {blog.likes}
            <button onClick={() => handleLikes(blog.id)}>like</button>
          </div>
          <div className="blog-details--user">by: {blog.user.username}</div>
          <div>
            <button onClick={removeBlog}>remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
