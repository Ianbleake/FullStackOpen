import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AddForm from '../components/AddForm'
import blogsService from '../services/blogs'

vi.mock('../services/blogs')

describe('AddForm', () => {
  let container
  const mockStateHandler = vi.fn()
  const mockShowHandler = vi.fn()
  const mockAlertHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <AddForm 
        state={[]} 
        stateHandler={mockStateHandler} 
        showHandler={mockShowHandler} 
        alertHandler={mockAlertHandler} 
      />
    ).container
  })

  it('calls handleSubmit when form is submitted', async () => { 
    const user = userEvent.setup()

    blogsService.create.mockResolvedValueOnce({
      title: 'Testing a component',
      author: 'IanBleake',
      url: 'www.blog.com'
    })

    const titleInput = await screen.findByTestId('title')
    const authorInput = await screen.findByTestId('autor')
    const urlInput = await screen.findByTestId('url')
    const submitButton = await screen.findByTestId('create')

    await user.type(titleInput, 'Testing a component')
    await user.type(authorInput, 'IanBleake')
    await user.type(urlInput, 'www.blog.com')

    await user.click(submitButton)

    expect(mockStateHandler).toHaveBeenCalledTimes(1)
    expect(mockShowHandler).toHaveBeenCalledWith(false)
    expect(mockAlertHandler).toHaveBeenCalledWith({ text: 'New blog added', type: 'success' })
  })
})
