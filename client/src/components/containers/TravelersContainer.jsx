import { useEffect, useState } from 'react'
import InvitesContainer from './InvitesContainer'
import UsersContainer from './UsersContainer'

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
      <div>
         <h4>Travelers Container</h4>
         <UsersContainer users={users} />
         <InvitesContainer invites={invites} mayInvite={mayInvite} />
      </div>
   )
}

export default TravelersContainer