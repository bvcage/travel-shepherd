const initialState = []

export default function invitesReducer(state = initialState, action) {
   switch (action.type) {
      case 'invites/inviteSent':
         return [...state, action.payload]
      default:
         return state
   }
}