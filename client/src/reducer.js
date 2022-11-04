import { combineReducers } from 'redux'
import invitesReducer from './reducers/invitesSlice'
import tripsReducer from './reducers/tripsSlice'
import userReducer from './reducers/userSlice'
import countriesReducer from './reducers/countriesSlice'

const rootReducer = combineReducers({
   countries: countriesReducer,
   invites: invitesReducer,
   trips: tripsReducer,
   user: userReducer
})

export default rootReducer