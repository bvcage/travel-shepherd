import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VotingAdminContainer from './VotingAdminContainer'

function ProposalVotingContainer (props) {
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   const [traveler, setTraveler] = useState({})

   useEffect(() => {
      if (!!trip.id && !!user.id) {
         fetch(`/travelers?trip_id=${trip.id}&user_id=${user.id}`).then(r=>{
            if (r.ok) r.json().then(travelers => {
               if (travelers.length === 1) setTraveler(travelers[0])
               else console.log('error: search returned >1 traveler')
            })
            else console.log(r)
         })
      }
   }, [trip, user])


   const VoteBtn = () => {
      const status = trip['proposal_voting_is_open?']
         ? (traveler.has_voted_for_proposal ? 'submitted' : 'vote')
         : (!!trip.voting_closes_at && trip.voting_closes_at < Date.now() ? 'closed' : 'not open yet')
      return (
         <button type='button'
            className='btn btn-primary'
            disabled={status !== 'vote'}
            onClick={() => navigate('vote')}
            >{status}</button>
      )
   }


   if (!trip.id) return <></>
   return (
      <div className='container'>
         {trip['proposal_voting_is_open?'] && !traveler.has_voted_for_proposal ? <VoteBtn /> : null}
         {user.id === trip.owner.id ? <VotingAdminContainer trip={trip} /> : null}
      </div>
   )
}

export default ProposalVotingContainer