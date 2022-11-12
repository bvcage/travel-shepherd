import { useEffect, useState } from 'react'
import TripInvitesContainer from '../invites/TripInvitesContainer'
import TravelerCard from './TravelerCard'

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

   const cards = !!travelers ? travelers.map(traveler => {
      return (
         <div key={traveler.user.id} className='col col-12 col-md-6'>
            <TravelerCard key={traveler.user.id} traveler={traveler.user} />
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <h3>Companions</h3>
         <div className='row'>
            {cards}
         </div>
         {!!trip.winning_proposal_id ? null : <TripInvitesContainer invites={invites} mayInvite={mayInvite} />}
      </div>
   )
}

export default TravelersContainer