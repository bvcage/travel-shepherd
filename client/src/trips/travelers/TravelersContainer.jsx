import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TripInvitesContainer from '../invites/TripInvitesContainer'
import TravelerCard from './TravelerCard'

function TravelersContainer (props) {
   const { trip, mayInvite } = props
   const navigate = useNavigate()
   const user = useSelector(state => state.user)
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

   function handleClick (username) {
      navigate(`/${username}/profile`)
   }

   const cards = !!travelers ? travelers.map(traveler => {
      return (
         <div key={traveler.user.id} className='col col-12 col-md-6'>
            <TravelerCard key={traveler.user.id} traveler={traveler.user} onClick={handleClick} />
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <h3>Companions</h3>
         <div className='row'>
            {cards}
         </div>
         {!!trip.winning_proposal_id && trip.owner.id !== user.id
            ? null
            : <TripInvitesContainer invites={invites} mayInvite={mayInvite} />}
      </div>
   )
}

export default TravelersContainer