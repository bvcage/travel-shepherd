import { combineReducers } from 'redux'
import countriesReducer from './home/countriesSlice'
import activitiesReducer from './destinations/activities/activitiesSlice'
import invitesReducer from './trips/invites/invitesSlice'
import tripReducer from './trips/tripSlice'
import tripsReducer from './trips/tripsSlice'
import userReducer from './users/userSlice'

const rootReducer = combineReducers({
   activities: activitiesReducer,
   countries: countriesReducer,
   invites: invitesReducer,
   trip: tripReducer,
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer