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

   const VoteBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('vote')}
            >vote</button>
      )
   }

   const status = trip.voting_is_open
      ? (traveler.has_voted ? 'vote submitted' : 'vote soon!')
      : 'voting is not open'

   if (!trip.id) return <></>
   return (
      <div className='container'>
         <h4>Voting Container</h4>
         <h5>status: {status}</h5>
         {trip.voting_is_open && !traveler.has_voted ? <VoteBtn /> : null}
         {user.id === trip.owner.id ? <VotingAdminContainer trip={trip} /> : null}
      </div>
   )
}

export default VotingContainer