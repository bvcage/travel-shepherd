import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import VotingAdminContainer from './VotingAdminContainer'

function ActivityVotingContainer (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   const [traveler, setTraveler] = useState('')

   useEffect(() => {
      if (!traveler && !!trip.id && !!user.id) {
         let url = '/travelers?'
         url += 'trip_id=' + trip.id
         url += '&user_id=' + user.id
         fetch(url).then(r=>{
            if (r.ok) r.json().then(travelers => {
               if (travelers.length === 1) setTraveler(travelers[0])
               else console.log('error: more than 1 traveler returned for trip_id & user_id')
            })
            else console.log(r)
         })
      }
   }, [trip, user, traveler])

   const VoteBtn = () => {
      return (
         <button
            type='button'
            className='btn btn-primary'
            onClick={() => navigate('vote')}
            >vote</button>
      )
   }

   const SubmittedBtn = () => {
      return (
         <button
            type='button'
            className='btn btn-success'
            disabled={true}
            >vote submitted</button>
      )
   }

   const PendingBtn = () => {
      return (
         <button 
            type='button'
            className='btn btn-secondary'
            disabled={true}
            >pending...</button>
      )
   }

   const NotOpenBtn = () => {
      return (
         <button
            type='button'
            className='btn btn-secondary'
            disabled={true}
            >unavailable</button>
      )
   }
   
   return (
      <div>
         <h3>activity voting</h3>
         {trip['activity_voting_is_open?']
            ? traveler.has_voted_for_activities ? <SubmittedBtn /> : <VoteBtn />
            : traveler.has_voted_for_activities ? <PendingBtn /> : <NotOpenBtn />
         }
         {user.id === (trip.owner_id || trip.owner.id) ? <VotingAdminContainer /> : null}
      </div>
   )
}

export default ActivityVotingContainer