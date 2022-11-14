const initialState = {}

export default function destinationsReducer(state = initialState, action) {
   switch (action.type) {
      case 'destinations/fullListLoaded':
         return {...state, list: action.payload}
      case 'destinations/showSelected':
         return {...state, selected: action.payload}
      default:
         return state
   }
}