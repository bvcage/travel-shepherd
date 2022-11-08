const initialState = []

export default function countriesReducer (state = initialState, action) {
   switch (action.type) {
      case 'countries/countriesLoaded':
         return [...action.payload]
      default:
         return state
   }
}