import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import alertReducer from './reducers/alertReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    alert: alertReducer
  }
})

export default store