const initialState = []

export default function invitesReducer(state = initialState, action) {
   switch (action.type) {
      case 'invites/invitesLoaded':
         return [...state, action.payload]
      case 'invites/inviteAccepted':
         return [...state.filter(invite => invite.id !== action.payload.id)]
      case 'invites/inviteRejected':
         return [...state.filter(invite => invite.id !== action.payload.id)]
      default:
         return state
   }
}