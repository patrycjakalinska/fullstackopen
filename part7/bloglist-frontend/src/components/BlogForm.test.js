import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("onSubmit is called with the right details when a new blog is created", async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText("title")
  const authorInput = screen.getByPlaceholderText("author")
  const urlInput = screen.getByPlaceholderText("url")

  const sendButton = screen.getByText("create")

  const blog = { title: "test-title", author: "test-author", url: "test-url" }

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual(blog)
})
