import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './Layout/App'
import noteReducer from './Reducers/Reducer'
import './Styles/index.css'

const store = createStore(noteReducer)

store.dispatch({
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  },
  type: 'NEW_NOTE'
})

store.dispatch({
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  },
  type: 'NEW_NOTE'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)