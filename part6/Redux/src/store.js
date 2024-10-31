import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './Reducers/Reducer'
import filterReducer from './Reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

export default store