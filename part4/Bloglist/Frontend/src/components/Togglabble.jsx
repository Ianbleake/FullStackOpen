import React from 'react'
import PropTypes from 'prop-types'

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

Togglabble.propTypes = {
  labelButton: PropTypes.string.isRequired
}

export default Togglabble