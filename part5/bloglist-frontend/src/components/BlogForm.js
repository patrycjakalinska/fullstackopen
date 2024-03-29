import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const isAdded = addBlog({ title, author, url })

    if (isAdded) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div className="blog-form">
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            placeholder="title"
            id="title"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            placeholder="author"
            id="author"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            placeholder="url"
            id="url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="blog-form--button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
