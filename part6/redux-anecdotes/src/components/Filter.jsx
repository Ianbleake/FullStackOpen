import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event)=>{
    event.preventDefault();
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <input onChange={handleChange} className="input" name="text" placeholder="Search..." type="search" />
    </div>
  )
}

export default Filter