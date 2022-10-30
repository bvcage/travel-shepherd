let initialState = {}

const persistedState = localStorage.getItem('user')
if (!!persistedState) {
   initialState = JSON.parse(persistedState)
}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case 'user/userLoggedIn':
         return {...action.payload}
      case 'user/userLoggedOut':
         return {}
      case 'user/userUpdated':
         return {...action.payload}
      default:
         return state
   }
}