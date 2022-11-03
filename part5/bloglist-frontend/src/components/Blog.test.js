import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  let blog
  let user

  let handleLikesMock
  let handleRemoveMock

  beforeEach(() => {
    user = { username: 'test' }
    blog = {
      title: 'My new test blog',
      author: 'Testing Johnny',
      url: 'testurl.com',
      likes: 7,
      user,
    }

    handleLikesMock = jest.fn()
    handleRemoveMock = jest.fn()

    component = render(
      <Blog
        blog={blog}
        handleLikes={handleLikesMock}
        handleRemove={handleRemoveMock}
      />
    )
  })

  test('title and author is rendered', () => {
    const title = component.container.querySelector('.blog-title')
    const author = component.container.querySelector('.blog-author')

    expect(title).toHaveTextContent(blog.title)
    expect(author).toHaveTextContent(blog.author)
  })

  test('url and likes (details) are not rendered by default', () => {
    const details = component.container.querySelector('.blog-details')

    expect(details).toBeNull()
  })

  test('clicking the button shows the details', async () => {
    const button = component.getByText('view')

    const user = userEvent.setup()
    await user.click(button)
    expect(button).toHaveTextContent('hide')

    const url = component.container.querySelector('.blog-details--url')
    const likes = component.container.querySelector('.blog-details--likes')
    const username = component.container.querySelector('.blog-details--user')

    expect(url).toHaveTextContent(blog.url)
    expect(likes).toHaveTextContent(blog.likes)
    expect(username).toHaveTextContent(blog.user.username)
  })

  test('clicking like button x times will fire event the same amount of times', async () => {
    const user = userEvent.setup()

    const viewButton = component.getByText('view')
    await user.click(viewButton)

    const likeButton = component.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLikesMock.mock.calls).toHaveLength(2)
  })

})
