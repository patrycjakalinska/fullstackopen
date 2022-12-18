import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { changeNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()

    const isAdded = props.createBlog({ title, author, url })

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

export default connect(null, { createBlog, changeNotification })(BlogForm)
