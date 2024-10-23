import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './Reducers/reducer'
import './Styles/app.css'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  } 

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }


  return (
    <div className='container' >
      <div className='stats' >
        <div className='stat' >
          <div className='count' >{store.getState().good}</div>
          <button className='btn' onClick={good}>good</button> 
        </div>
        <div className='stat' >
          <div className='count' >{store.getState().ok}</div>
          <button className='btn' onClick={ok}>ok</button> 
        </div>
        <div className='stat' >
          <div className='count' >{store.getState().bad}</div>
          <button className='btn' onClick={bad}>bad</button>
        </div>
      </div>
      <button className='btn rest' onClick={zero}>reset stats</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
