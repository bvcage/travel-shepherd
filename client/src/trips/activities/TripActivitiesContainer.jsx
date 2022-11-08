import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function TripActivitiesContainer (props) {
   const trip = useSelector(state => state.trip)

   const [places, setPlaces] = useState([])

   useEffect(() => {
      console.log(trip)
      if (!!trip.destination) {
         fetch(`/destinations/${trip.destination.id}/places`).then(r=>{ // TO DO : change to activities
            if (r.ok) r.json().then(console.log)
            else console.log(r)
         })
      }
   }, [trip])

   return (
      <div>
         <h3>must-do's</h3>
         <button type='button' className='btn btn-primary'>+ add activity</button>
      </div>
   )
}

export default TripActivitiesContainer