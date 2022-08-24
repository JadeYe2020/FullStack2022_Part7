/* eslint-disable quotes */
import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test("renders blog's title and author but not url or number of likes at first", () => {
  const blog = {
    "title": "a blog for testing rendering",
    "author": "JD",
    "url": "http://sometesting.com",
    "likes": 2
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText("a blog for testing rendering JD")
  expect(element).toBeDefined()
  const url = screen.queryByText("http://sometesting.com")
  expect(url).toBeNull()
  const likes = screen.queryByText("2")
  expect(likes).toBeNull()
})

test("the blog's url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    "title": "a blog for testing rendering",
    "author": "JD",
    "url": "http://sometesting.com",
    "likes": 2
  }

  const { container } = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = container.querySelector("#url")
  expect(url).toHaveTextContent("http://sometesting.com")
  const likes = container.querySelector("#likes")
  expect(likes).toHaveTextContent("2")
})

test("when the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    "title": "a blog for testing rendering",
    "author": "JD",
    "url": "http://sometesting.com",
    "likes": 2
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const buttonToView = screen.getByText('view')
  await user.click(buttonToView)

  const buttonToLike = container.querySelector('#like')
  await user.click(buttonToLike)
  await user.click(buttonToLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})