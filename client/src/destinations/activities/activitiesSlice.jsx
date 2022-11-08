const initialState = []

export default function activitiesReducer (state=initialState, action) {
   switch (action.type) {
      case 'trip/activities/activitiesLoaded':
         return [...action.payload]
      default:
         return state
   }
}