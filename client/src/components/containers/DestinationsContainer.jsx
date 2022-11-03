import React from 'react'
import DestinationCard from '../cards/DestinationCard'

function DestinationsContainer (props) {
   const { destinations } = props
   
   const cards = !!destinations[0] ? destinations.map(destination => {
      return (
         <DestinationCard key={destination.id} destination={destination} />
      )
   }) : null

   return (
      <div className='container'>
         {cards}
      </div>
   )
}

export default DestinationsContainer