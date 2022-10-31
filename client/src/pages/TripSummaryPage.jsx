import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import UsersContainer from '../components/containers/UsersContainer'
import TripSummary from '../components/summaries/TripSummary'

function TripSummaryPage (props) {
   const location = useLocation()
   const trip = location.state.trip
   
   const [travelers, setTravelers] = useState([])

   useEffect(() => {
      fetch(`/trips/${trip.id}/users`).then(r=>{
         if (r.ok) r.json().then(users => setTravelers(users))
         else console.log(r)
      })
   }, [trip])

   return (
      <div>
         <h3>Trip Summary</h3>
         <TripSummary trip={trip} />
         <UsersContainer users={travelers} />
         <BackBtn />
      </div>
   )
}

export default TripSummaryPage