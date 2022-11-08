import { combineReducers } from 'redux'
import countriesReducer from './home/countriesSlice'
import invitesReducer from './trips/invites/invitesSlice'
import tripReducer from './trips/tripSlice'
import tripsReducer from './trips/tripsSlice'
import userReducer from './users/userSlice'

const rootReducer = combineReducers({
   countries: countriesReducer,
   invites: invitesReducer,
   trip: tripReducer,
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer