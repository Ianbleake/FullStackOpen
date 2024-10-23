
import '../Styles/App.css'

function App({store}) {

  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

  return (
    <div className='Counter' >
      <div className='display' >
        <button className='btn mas' onClick={e => store.dispatch({ type: 'DECREMENT' })} >-</button>
        <div className='count' >{store.getState()}</div>
        <button className='btn menos' onClick={e => store.dispatch({ type: 'INCREMENT' })} >+</button>
      </div>
      <button className='btn rest' onClick={e => store.dispatch({ type: 'ZERO' })} >Restart</button>
    </div>
  )
}

export default App
