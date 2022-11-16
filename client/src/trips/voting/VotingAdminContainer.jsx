import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReleaseResultsBtn from './ReleaseResultsBtn'
import UserVotesTable from './UserVotesTable'
import VotingModal from './VotingModal'

function VotingAdminContainer (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const [showPVBtns, setShowPVBtns] = useState(false)
   const [showPRBtns, setShowPRBtns] = useState(false)
   const [showAVBtns, setShowAVBtns] = useState(false)
   const [showARBtns, setShowARBtns] = useState(false)

   useEffect(() => {
      // proposal voting buttons
      if (trip['proposal_voting_is_open?'] === null ||
            trip['proposal_voting_is_open?'] === true) {
         setShowPVBtns(true)
      } else setShowPVBtns(false)
      // proposal results buttons
      if (trip['proposal_voting_is_open?'] === false &&
         !!trip.proposal_voting_closes_at &&
         !trip.winning_proposal_id) {
            setShowPRBtns(true)
         } else setShowPRBtns(false)
      // activity voting buttons
      if (!!trip.winning_proposal_id &&
         ( trip['activity_voting_is_open?'] === null || 
            trip['activity_voting_is_open?'] === true )) {
               setShowAVBtns(true)
            } else setShowAVBtns(false)
      // activity results buttons
      if (!!trip.winning_proposal_id &&
         trip['activity_voting_is_open?'] === false) {
            setShowARBtns(true)
         } else setShowARBtns(false)
   }, [trip])

   function closeActivitiesVoting () {
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'activity_voting_is_open?': false,
            'activity_voting_closes_at': new Date(),
            'trip_status_code': 600    // planning itinerary
         })
      }).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/activityVotingClosed', payload: trip}))
         else console.log(r)
      })
   }

   function closeProposalVoting () {
      // if (!!trip.voting_closes_at && new Date(trip.voting_closes_at) < Date.now()) return console.log('error: voting has already closed')
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'proposal_voting_is_open?': false,
            'proposal_voting_closes_at': new Date(),
            // trip_status_code is set when owner releases results
         })
      }).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/proposalVotingClosed', payload: trip}))
         else console.log(r)
      })
   }

   function openActivitiesVoting () {
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'activity_voting_is_open?': true,
            'activity_voting_opens_at': new Date(),
            'trip_status_code': 500    // activities voting
         })
      }).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/activityVotingOpened', payload: trip}))
         else console.log(r)
      })
   }

   function openProposalVoting () {
      // if (!!trip.voting_closes_at && new Date(trip.voting_closes_at) < Date.now()) return console.log('error: voting has already closed')
      dispatch({type: 'trip/votingOpened'})
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'proposal_voting_is_open?': true,
            'proposal_voting_opens_at': new Date(),
            'trip_status_code': 300    // destination aka proposal voting
         })
      }).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/proposalVotingOpened', payload: trip}))
         else console.log(r)
      })
   }

   function updateTripStatus (statusCode) {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               'trip_status_code': statusCode
            })
         }).then(r=>{
            if (r.ok) r.json().then(trip => dispatch({type: 'trip/statusUpdated', payload: trip.trip_status}))
         })
      }
   }

   const ProposalVotingBtns = () => {
      return (
         <div className='btn-group'>
            <button type='button'
               className='btn btn-primary'
               disabled={trip['proposal_voting_is_open?'] || trip.proposals.length < 2 || trip.travelers.length < 2}
               onClick={openProposalVoting}
               >open proposal voting</button>
            <button type='button'
               className='btn btn-warning'
               disabled={!trip['proposal_voting_is_open?']}
               data-bs-toggle='modal'
               data-bs-target='#votingModal'
               // onClick={closeProposalVoting}
               >close proposal voting</button>
         </div>
      )
   }

   const ProposalResultsBtns = () => {
      return (
         <div className='btn-group'>
            <button type='button'
               className='btn btn-primary'
               onClick={() => navigate('votes')}
               >view votes summary</button>
            <ReleaseResultsBtn trip={trip} />
         </div>
      )
   }

   const ActivityVotingBtns = () => {
      return (
         <div className='btn-group'>
            <button type='button'
               className='btn btn-primary'
               disabled={trip['activity_voting_is_open?'] || trip.num_activities < 3}
               onClick={openActivitiesVoting}
               >open activity voting</button>
            <button type='button'
               className='btn btn-danger'
               disabled={!trip['activity_voting_is_open?']}
               data-bs-toggle='modal'
               data-bs-target='#votingModal'
               // onClick={closeActivitiesVoting}
               >close activity voting</button>
         </div>
      )
   }

   const ActivityResultsBtns = () => {
      return (
         <div className='btn-group'>
            <button type='button'
               className='btn btn-primary'
               onClick={() => navigate('votes')}
               >view votes summary</button>
            <button type='button'
               className='btn btn-primary'
               onClick={() => updateTripStatus(600)}  // planning itinerary status
               >generate itinerary</button>
         </div>
      )
   }

   return (
      <div className='container'>
         <h4>voting admin</h4>
         <div className='container'>
            { showPVBtns ? <ProposalVotingBtns /> : null }
            { showPRBtns ? <ProposalResultsBtns /> : null }
            { showAVBtns ? <ActivityVotingBtns /> : null }
            { showARBtns ? <ActivityResultsBtns /> : null }
         </div>
         <div className='container'>
            {!!trip.trip_status && (
               (trip.trip_status.code >= 300 && trip.trip_status.code < 400) ||
               (trip.trip_status.code >= 500 && trip.trip_status.code < 600)) 
               ? <UserVotesTable showActVoteStatus={(trip['activity_voting_is_open?'])} />
               : null }
         </div>
         <VotingModal trip={trip}
            onClickConfirm={
               trip['proposal_voting_is_open?']
               ? closeProposalVoting
               : trip['activity_voting_is_open?']
                  ? closeActivitiesVoting
                  : () => {}}
         />
      </div>
   )
}

export default VotingAdminContainer