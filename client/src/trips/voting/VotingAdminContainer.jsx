import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReleaseResultsBtn from '../../components/buttons/ReleaseResultsBtn'
import UserVotesTable from './UserVotesTable'

function VotingAdminContainer (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)

   function closeActivitiesVoting () {
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'activity_voting_is_open?': false,
            'activity_voting_closes_at': new Date()
         })
      }).then(r=>{
         if (r.ok) r.json().then(console.log)
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
         body: JSON.stringify({'proposal_voting_is_open?': false, 'proposal_voting_closes_at': new Date()})
      }).then(r=>{
         if (r.ok) r.json().then(trip => {dispatch({type: 'trip/votingClosed', payload: trip})})
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
            'activity_voting_opens_at': new Date()
         })
      }).then(r=>{
         if (r.ok) r.json().then(console.log)
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
         body: JSON.stringify({'proposal_voting_is_open?': true, 'proposal_voting_opens_at': new Date()})
      }).then(r=>{
         if (r.ok) r.json().then(console.log)
         else console.log(r)
      })
   }

   const CloseVotingBtn = () => {
      return (
         <button type='button'
            className='btn btn-warning'
            onClick={closeProposalVoting}
            >close voting</button>
      )
   }

   const OpenVotingBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={openProposalVoting}
            >open voting</button>
      )
   }

   const UpdateVotingBtn = () => {
      return (
         <button type='button' className='btn btn-secondary'>update voting</button>
      )
   }

   const ViewSummaryBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('votes')}
            >view votes summary</button>
      )
   }

   const displayCloseBtn = trip.proposal_voting_is_open === true ? true : false

   const displayOpenBtn = !trip.voting_is_open && 
      (trip.proposal_voting_opens_at === null || new Date(trip.proposal_voting_opens_at) > Date.now()) &&
      (trip.proposal_voting_closes_at === null || new Date(trip.proposal_voting_closes_at) > Date.now())
      ? true : false

   console.log(trip)
   return (
      <div className='container'>
         <h4>voting admin</h4>
         <div className='container'>
            {displayOpenBtn ? <OpenVotingBtn /> : null}
            {displayCloseBtn ? <CloseVotingBtn /> : null}
            {displayOpenBtn || displayCloseBtn ? <UpdateVotingBtn /> : null}
            {!displayOpenBtn && !displayCloseBtn ? <> <ViewSummaryBtn /> <ReleaseResultsBtn trip={trip} /> </>: null}
            <button type='button'
               className='btn btn-outline-primary'
               onClick={openActivitiesVoting}
               >open activity voting</button>
            <button type='button'
               className='btn btn-outline-warning'
               onClick={closeActivitiesVoting}
               >close activity voting</button>
         </div>
         {displayCloseBtn || !displayOpenBtn ? (
            <div className='container'>
               <UserVotesTable showActVoteStatus={true} />
            </div>
         ) : null }
      </div>
   )
}

export default VotingAdminContainer