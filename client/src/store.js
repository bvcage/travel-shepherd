import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

let preloadedState
const persistedTripsString = localStorage.getItem('trips')

if (persistedTripsString) {
   preloadedState = {
      trips: JSON.parse(persistedTripsString)
   }
}

const composedEnhancer = composeWithDevTools()

const store = configureStore(
   {reducer: rootReducer},
   preloadedState,
   composedEnhancer
)

export default store