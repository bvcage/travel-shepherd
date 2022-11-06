import React from 'react'
import { useSelector } from 'react-redux'
import TripCard from '../cards/TripCard'

function TripsContainer (props) {
   const trips = useSelector(state => state.trips)

   const cards = !!trips[0] ? trips.map(trip => {
      return (
         <div className='col-12 col-md-6'>
            <TripCard key={trip.id} trip={trip} />
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <h2 className='page-header'>my trips</h2>
         <div className='page-content'>
            <div className='row'>
               {cards}
            </div>
         </div>
      </div>
   )
}

export default TripsContainer