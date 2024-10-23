import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='btn toggle' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='togglecont  togglableContent ' style={showWhenVisible}>
        {props.children}
        <button className='btn toggle cancel' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

})


export default Togglable