import React from 'react'

const Togglabble = (props) => {
  return (
    <div>
      <button className='btn' onClick={props.click}>
        {props.labelButton}
      </button>
      <div>
        {props.showState ? props.children : ''}
      </div>
    </div>
  )
}

export default Togglabble