import React from 'react'
import { useSelector } from 'react-redux'
import TripCard from '../cards/TripCard'

function TripsContainer (props) {
   const trips = useSelector(state => state.trips)

   const cards = !!trips[0] ? trips.map(trip => {
      return (
         <TripCard key={trip.id} trip={trip} />
      )
   }) : null

   return (
      <div>
         <h6>trips container</h6>
         {cards}
      </div>
   )
}

export default TripsContainer