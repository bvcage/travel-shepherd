import React from 'react'
import { useSelector } from 'react-redux'
import TripCard from '../cards/TripCard'

function TripsContainer (props) {
   const trips = useSelector(state => state.trips)

   console.log(trips)

   const cards = trips.map(trip => {
      return (
         <TripCard key={trip.id} trip={trip} />
      )
   })

   return (
      <div>
         <h6>trips container</h6>
         {cards}
      </div>
   )
}

export default TripsContainer