const initialState = []

function nextTripId(trips) {
   const maxId = trips.reduce((maxId, trip) => Math.max(trip.id, maxId), -1)
   return maxId + 1
}

export default function tripsReducer(state = initialState, action) {
   switch (action.type) {
      case 'trips/tripAdded':
         return [
            ...state,
            {
               id: nextTripId(state),
               name: action.payload
            }
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
      default:
         return state
   }
 }