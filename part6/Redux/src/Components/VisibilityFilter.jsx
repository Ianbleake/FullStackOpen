import { filterChange } from '../Reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div className="radiogroup">
      <div className="wrapper">
        <input value="a" id="a" name="filter" type="radio" className="state" onChange={() => dispatch(filterChange('ALL'))} />
        <label htmlFor="a" className="label">
          <div className="indicator"></div>
          <span className="text">All</span>
        </label>
      </div>
      <div className="wrapper">
        <input value="b" id="b" name="filter" type="radio" className="state" onChange={() => dispatch(filterChange('IMPORTANT'))} />
        <label htmlFor="b" className="label">
          <div className="indicator"></div>
          <span className="text">Important</span>
        </label>
      </div>
      <div className="wrapper">
        <input value="c" id="c" name="filter" type="radio" className="state" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
        <label htmlFor="c" className="label">
          <div className="indicator"></div>
          <span className="text">Non Important</span>
        </label>
      </div>
    </div>
  )
}

export default VisibilityFilter