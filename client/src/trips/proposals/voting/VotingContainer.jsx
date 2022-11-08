import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VotingAdminContainer from './VotingAdminContainer'

function VotingContainer (props) {
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


   const VoteBadge = () => {
      return (
         <h6><span className='badge bg-dark p-2 mb-2'>{status}</span></h6>
      )
   }

   const VoteBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('vote')}
            >vote</button>
      )
   }

   const status = trip.voting_is_open
      ? (traveler.has_voted ? 'submitted' : 'vote soon!')
      : (!!trip.voting_closes_at && new Date(trip.voting_closes_at) < Date.now() ? 'closed' : 'not yet open')

   if (!trip.id) return <></>
   return (
      <div className='container'>
         <h3>voting</h3>
         {trip.voting_is_open && !traveler.has_voted ? <VoteBtn /> : <VoteBadge />}
         {user.id === trip.owner.id ? <VotingAdminContainer trip={trip} /> : null}
      </div>
   )
}

export default VotingContainer