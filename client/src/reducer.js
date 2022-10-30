import { combineReducers } from 'redux'

import tripsReducer from './features/trips/tripsSlice'
import userReducer from './features/user/userSlice'

const rootReducer = combineReducers({
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer