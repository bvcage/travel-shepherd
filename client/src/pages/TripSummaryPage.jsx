import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import UsersContainer from '../components/containers/UsersContainer'
import TripSummary from '../components/summaries/TripSummary'

function TripSummaryPage (props) {
   const { id } = useParams()
   const [trip, setTrip] = useState({})

   useEffect(() => {
      fetch(`/trips/${id}`).then(r=>{
         if (r.ok) r.json().then(trip => setTrip(trip))
         else console.log(r)
      })
   }, [id])

   const users = !!trip.travelers ? trip.travelers.map(traveler=>traveler.user) : null

   return (
      <div>
         <h3>Trip Summary</h3>
         <TripSummary trip={trip} />
         <UsersContainer users={users} mayInvite={true} trip={trip} />
         <BackBtn />
      </div>
   )
}

export default TripSummaryPage