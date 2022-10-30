import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

let preloadedState
const persistedTripsString = localStorage.getItem('trips')
const persistedUserString = localStorage.getItem('user')

if (persistedTripsString) {
   preloadedState = {
      trips: JSON.parse(persistedTripsString),
      user: JSON.parse(persistedUserString)
   }
}

const composedEnhancer = composeWithDevTools()

const store = configureStore(
   {reducer: rootReducer},
   preloadedState,
   composedEnhancer
)

export default store