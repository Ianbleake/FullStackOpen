import { Link } from 'react-router-dom'

const Menu = () => {

  return (
    <div className='menu' >
      <button className='button'>
        <Link className='button_top' to='/' >anecdotes</Link>
      </button>

      <button className='button'>
        <Link className='button_top' to='/about' >about</Link>
      </button>

      <button className='button'>
        <Link className='button_top' to='/create' >create new</Link>
      </button>
    </div>
  )
}

export default Menu