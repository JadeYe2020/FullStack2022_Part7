import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNew from './CreateNew'

test('the event handler it received as props with the right details when a new blog is created', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  let container = render(
    <CreateNew createNew={mockHandler} />
  ).container

  const titleInput = container.querySelector('#title-input')
  await user.type(titleInput, 'Testing creating a new blog')
  const authorInput = container.querySelector('#author-input')
  await user.type(authorInput, 'CK')
  const urlInput = container.querySelector('#url-input')
  await user.type(urlInput, 'http://sometesting.com')

  const button = screen.getByText('create')
  await user.click(button)

  expect(mockHandler).toBeCalledWith(
    {
      title: 'Testing creating a new blog',
      author: 'CK',
      url: 'http://sometesting.com'
    }
  )
})