const initialState = {
   activities: null
}

export default function tripReducer (state = initialState, action) {
   switch(action.type) {
      case 'trip/tripChosen':
         return {...action.payload}
      case 'trip/statusUpdated':
         return {...state,
            trip_status: action.payload
         }
      case 'trip/activitiesLoaded':
         return {...state,
            num_activities: action.payload
         }
      case 'trip/proposalVotingOpened':
      case 'trip/proposalVotingClosed':
      case 'trip/activityVotingOpened':
      case 'trip/activityVotingClosed':
         return {...state, ...action.payload}
      case 'trip/resultsAreIn':
         return {...state,
            'winning_proposal': action.payload
         }
      default:
         return state
   }
}