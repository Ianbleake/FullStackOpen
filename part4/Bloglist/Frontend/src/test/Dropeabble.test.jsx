import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropeabble from '../components/Dropeabble'

describe('Dropeabble', () => {
  let container

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

  beforeEach(() => {
    container = render(<Dropeabble blog={blog} loggedUser={blog.user} />).container
  })

  test('Show content 1 click',async () => { 

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

  test('2click hide info',async () => {

    const user = userEvent.setup()
    const button = screen.getByRole('checkbox')
    const info = container.querySelector('.fullinfo')

    expect(info).not.toHaveClass('droped')
    
    await user.click(button)

    await user.click(button)

    expect(info).not.toHaveClass('droped')

  })

});




