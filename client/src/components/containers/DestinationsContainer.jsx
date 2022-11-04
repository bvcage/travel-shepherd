import React from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationCard from '../cards/DestinationCard'

function DestinationsContainer (props) {
   const { destinations } = props
   const navigate = useNavigate()

   function handleClick (goToId) {
      navigate(`${goToId}`)
   }
   
   const cards = !!destinations[0] ? destinations.map(destination => {
      return (
         <DestinationCard key={destination.id} destination={destination} onClick={handleClick} />
      )
   }) : null

   return (
      <div className='container'>
         <div className='row row-cols-3'>
            {cards}
         </div>
      </div>
   )
}

export default DestinationsContainer