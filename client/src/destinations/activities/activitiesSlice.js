const initialState = []

export default function activitiesReducer (state=initialState, action) {
   switch (action.type) {
      case 'activities/activitiesLoaded':
         return [...action.payload]
      default:
         return state
   }
}