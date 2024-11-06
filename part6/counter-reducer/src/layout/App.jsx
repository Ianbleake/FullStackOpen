import '../styles/App.css'
import Display from '../components/Display'
import Button from '../components/Button'



const App = () => {

  return (
      <div className='Counter'>
        <div className='display'>
          <Button type={'menos'} action={'DEC'}  />
          <Display/>
          <Button type={'mas'} action={'INC'}  />
        </div>
          <Button type={'rest'} action={'ZERO'}  />
      </div>
  )
}

export default App