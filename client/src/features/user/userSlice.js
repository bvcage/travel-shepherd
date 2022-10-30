let initialState = {}

const persistedState = localStorage.getItem('user')
console.log(persistedState)
if (!!persistedState) {
   initialState = JSON.parse(persistedState)
}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case 'user/userLoggedIn':
         return {...action.payload}
      case 'user/userLoggedOut':
         return initialState
      default:
         return state
   }
}