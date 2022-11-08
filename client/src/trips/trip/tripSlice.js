const initialState = {
   activities: null
}

export default function tripReducer (state = initialState, action) {
   switch(action.type) {
      case 'trip/tripChosen':
         return {...action.payload}
      case 'trip/votingOpened':
         return {...state,
            'voting_is_open': true
         }
      case 'trip/votingClosed':
         return {...state,
            'voting_is_open': action.payload.voting_is_open,
            'voting_closes_at': action.payload.voting_closes_at
         }
      case 'trip/resultsAreIn':
         return {...state,
            'winning_proposal': action.payload
         }
      default:
         return state
   }
}