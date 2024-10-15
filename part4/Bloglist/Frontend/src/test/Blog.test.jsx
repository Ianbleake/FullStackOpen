import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('Render content', () => {
  const blog = {
    title: "Testing a component",
    author: "IanBleake",
    url: "www.blog.com",
    likes: 1,
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug(container)

  const title = container.querySelector('.btitle')
  const author = container.querySelector('.author')

  expect(title).toHaveTextContent('Testing a component')
  expect(author).toHaveTextContent('IanBleake')

})