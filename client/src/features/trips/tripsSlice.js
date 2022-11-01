const initialState = []

export default function tripsReducer(state = initialState, action) {
   switch (action.type) {
      case 'trips/tripsLoaded':
         return [...action.payload]
      case 'trips/tripAdded':
         return [
            ...state,
            {...action.payload}
         ]
      case 'trips/tripRenamed':
         return state.map(trip => {
            if (trip.id !== action.payload.id) {
               return trip
            }
            return {
               ...trip,
               name: action.payload.name
            }
         })
      case 'trips/invitesLoaded':
         return state.map(trip => {
            if (trip.id !== action.payload.id) {
               return trip
            }
            return {
               ...trip,
               invites: [...action.payload.invites]
            }
         })
      case 'trips/userLoggedOut':
         return {}
      default:
         return state
   }
}