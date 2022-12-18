import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, loggedUser }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  return (
    <div className="blog-post">
      <div className="blog-title">{blog.title} </div>
      <div className="blog-author">{blog.author}</div>
      <button
        className="blog--view-detials"
        onClick={() => setDisplayDetails(!displayDetails)}
      >
        {displayDetails ? 'hide' : 'view'}
      </button>
      {displayDetails && (
        <div className="blog-details">
          <div className="blog-details--url">{blog.url}</div>
          <div className="blog-details--likes">
            likes:<span className="likes-count">{blog.likes}</span>
            <button onClick={handleLikes}>like</button>
          </div>
          <div className="blog-details--user">by: {blog.user.username}</div>
          <div>
            {loggedUser.username === blog.user.username && (
              <button onClick={handleDelete}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
