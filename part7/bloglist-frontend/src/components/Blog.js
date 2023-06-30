import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogLike, blogComment, removeBlog } from '../reducers/blogReducer'
import { changeNotification } from '../reducers/notificationReducer'

const Blog = ({ blogs }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleLikes = (blog) => {
    dispatch(blogLike(blog))
    dispatch(changeNotification(`You liked ${blog.title} by ${blog.author}`))
  }
  const handleDelete = (blog) => {
    dispatch(removeBlog(blog))
    navigate('/')
  }

  const postComment = () => {
    dispatch(blogComment(blog, { comment: comment }))
    setComment('')
  }

  const loggedUser = useSelector((state) => state.loggedinUser)
  if (!blog) return null

  return (
    <div className="">
      <div>
        <div className="text-xl">
          <span className="text-blue-700 "> {blog.title} </span>written by{' '}
          <span className="underline">{blog.author}</span>
        </div>
        <div className="">
          <span className="">{blog.likes}</span> likes
          <button onClick={() => handleLikes(blog)}>like</button>
        </div>

        <a
          href={'//' + blog.url}
          className="inline-flex items-center font-medium text-blue-700 hover:underline"
        >
          {blog.url}
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <div className="">added by: {blog.user.username}</div>
        <div className="my-2">
          {loggedUser.username === blog.user.username && (
            <button
              className="bg-blue-100 py-0"
              onClick={() => handleDelete(blog)}
            >
              remove
            </button>
          )}
        </div>
        <div className="my-4">
          <h3>comments</h3>
          <div className="flex flex-row flex-wrap justify-center">
            <input
              type="text"
              value={comment}
              id="comment"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="write your comment..."
              name="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <button onClick={postComment} className="bg-blue-100 py-0 my-4">
              add comment
            </button>
          </div>
          <ul className="list-disc divide-y">
            {blog.comments &&
              blog.comments.map((comment) => (
                <li key={Math.floor(Math.random() * 1000000)} className="py-2">
                  {comment}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
