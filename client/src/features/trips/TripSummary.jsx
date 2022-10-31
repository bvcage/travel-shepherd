import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'
import UsersContainer from '../../components/containers/UsersContainer'

function TripSummary (props) {
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
         <UsersContainer users={travelers} />
         <BackBtn />
      </div>
   )
}

export default TripSummary