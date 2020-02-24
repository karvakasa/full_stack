import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Title testing is done with react-testing-library',
    author: 'Sir Arthur Conan Doyle'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Title testing is done with react-testing-library', 'Sir Arthur Conan Doyle'
  )
})
test('renders all data when view button is pressed', async () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog Blog={Blog} handleBlogView={mockHandler}/>
  )
  const button = component.getByText('view')
  fireEvent.click(button)
})
test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog Blog={Blog} handleBlogView={mockHandler} handleLikeButton={mockHandler}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const buttonoikee = component.getByText('like')
  fireEvent.click(buttonoikee)
  fireEvent.click(buttonoikee)

  expect(mockHandler.mock.calls.length).toBe(2)
})
