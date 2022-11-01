import { combineReducers } from 'redux'
import invitesReducer from './features/invites/invitesSlice'
import tripsReducer from './features/trips/tripsSlice'
import userReducer from './features/user/userSlice'

const rootReducer = combineReducers({
   invites: invitesReducer,
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer