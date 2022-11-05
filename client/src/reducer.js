import { combineReducers } from 'redux'
import invitesReducer from './reducers/invitesSlice'
import tripsReducer from './reducers/tripsSlice'
import userReducer from './reducers/userSlice'
import countriesReducer from './reducers/countriesSlice'
import tripReducer from './reducers/tripSlice'

const rootReducer = combineReducers({
   countries: countriesReducer,
   invites: invitesReducer,
   trip: tripReducer,
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer