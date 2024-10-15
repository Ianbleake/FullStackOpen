import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropeabble from '../components/Dropeabble'

test('Dropeabble',async () => { 

  const blog = {
    title: "Testing a component",
    author: "IanBleake",
    url: "www.blog.com",
    likes: 1,
    user: {
      username: 'Ianbleake',
      name: 'IanBleake',
      id: '1' 
    }
  }

  const mockHandler = vi.fn()

  const { container } = render(<Dropeabble blog={blog} loggedUser={blog.user} />)

  const user = userEvent.setup()
  const button = screen.getByRole('checkbox')
  const info = container.querySelector('.fullinfo')

  expect(info).not.toHaveClass('droped')
  
  await user.click(button)

  const url = container.querySelector('#url')
  const likes = container.querySelector('#likes')

  expect(info).toHaveClass('droped')
  expect(url).toHaveTextContent('www.blog.com')
  expect(likes).toHaveTextContent('1')

})