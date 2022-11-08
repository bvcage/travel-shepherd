import { useEffect, useState } from 'react'
import TripInvitesContainer from '../invites/TripInvitesContainer'
import UsersContainer from '../../components/containers/UsersContainer'

function TravelersContainer (props) {
   const { trip, mayInvite } = props

   const [travelers, setTravelers] = useState([])
   const [invites, setInvites] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/invites`).then(r=>{
            if (r.ok) r.json().then(setInvites)
            else console.log(r)
         })
         fetch(`/trips/${trip.id}/travelers`).then(r=>{
            if (r.ok) r.json().then(setTravelers)
            else console.log(r)
         })
      }
   }, [trip])

   const users = !!travelers ? travelers.map(traveler => traveler.user) : null

   return (
      <div className='container'>
         <h3>Companions</h3>
         <UsersContainer users={users} />
         {!!trip.winning_proposal_id ? null : <TripInvitesContainer invites={invites} mayInvite={mayInvite} />}
      </div>
   )
}

export default TravelersContainer