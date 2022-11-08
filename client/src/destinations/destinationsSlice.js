const initialState = []

export default function destinationsReducer(state = initialState, action) {
   switch (action.type) {
      case 'destinations/destinationLoaded':
         return [...state, action.payload]
      default:
         return state
   }
}