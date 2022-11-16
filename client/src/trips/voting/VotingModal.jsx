import '../../assets/css/modals.css'
import React from 'react'

function VotingModal (props) {
   const { trip, onClickConfirm } = props

   const votingStage = trip['proposal_voting_is_open?'] ? 'proposal voting' :
      trip['activity_voting_is_open?'] ? 'activity voting' : 'voting'

   const votingMessage = trip['proposal_voting_is_open?'] ? 'This will confirm a destination and allow users to propose activities.' :
      trip['activity_voting_is_open?'] ? 'This will auto-generate a suggested itinerary.' : null

      console.log(trip)
   if (!trip) return <></>
   return (
      <div id='votingModal'
            className='modal fade'
            role='dialog'
            tabIndex='-1'
            aria-labelledby=''
            aria-hidden='true' >
         <div className='modal-dialog' role='document'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h2 className='modal-title'>close voting</h2>
               </div>
               <div className='modal-body'>
                  <p>Are you ready to close {votingStage} for<br/>{trip.name}?</p>
                  {votingMessage ? <p>{votingMessage}</p> : null}
               </div>
               <div className='modal-footer'>
               <button type='button' className='btn btn-outline-secondary' data-bs-dismiss='modal'>cancel</button>
                  <button type='button' className='btn btn-warning' data-bs-dismiss='modal' onClick={onClickConfirm}>confirm</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VotingModal