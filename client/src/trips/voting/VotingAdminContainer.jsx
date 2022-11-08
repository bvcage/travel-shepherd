import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReleaseResultsBtn from '../../components/buttons/ReleaseResultsBtn'
import UserVotesTable from './UserVotesTable'

function VotingAdminContainer (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)

   function handleCloseVoting () {
      // if (!!trip.voting_closes_at && new Date(trip.voting_closes_at) < Date.now()) return console.log('error: voting has already closed')
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({'voting_is_open': false, 'voting_closes_at': new Date()})
      }).then(r=>{
         if (r.ok) r.json().then(trip => {dispatch({type: 'trip/votingClosed', payload: trip})})
         else console.log(r)
      })
   }

   function handleOpenVoting () {
      // if (!!trip.voting_closes_at && new Date(trip.voting_closes_at) < Date.now()) return console.log('error: voting has already closed')
      dispatch({type: 'trip/votingOpened'})
      fetch(`/trips/${trip.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({'voting_is_open': true, 'voting_opens_at': new Date()})
      }).then(r=>{
         if (r.ok) r.json().then(console.log)
         else console.log(r)
      })
   }

   const CloseVotingBtn = () => {
      return (
         <button type='button'
            className='btn btn-warning'
            onClick={handleCloseVoting}
            >close voting</button>
      )
   }

   const OpenVotingBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={handleOpenVoting}
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
            >view summary</button>
      )
   }

   const displayCloseBtn = trip.voting_is_open === true ? true : false

   const displayOpenBtn = !trip.voting_is_open && 
      (trip.voting_opens_at === null || new Date(trip.voting_opens_at) > Date.now()) &&
      (trip.voting_closes_at === null || new Date(trip.voting_closes_at) > Date.now())
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
         </div>
         {displayCloseBtn ? (
            <div className='container'>
               <UserVotesTable />
            </div>
         ) : null }
      </div>
   )
}

export default VotingAdminContainer