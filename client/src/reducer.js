import { combineReducers } from 'redux'

import tripsReducer from './features/trips/tripsSlice'

const rootReducer = combineReducers({
   trips: tripsReducer
})

export default rootReducer