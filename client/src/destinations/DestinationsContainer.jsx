import React from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationCard from '../components/cards/DestinationCard'

function DestinationsContainer (props) {
   const { destinations } = props
   const navigate = useNavigate()

   function handleClick (goToId) {
      navigate(`${goToId}`)
   }
   
   const cards = !!destinations[0] ? destinations.map(destination => {
      return (
         <div key={destination.id} className='col-12 col-md-6 col-lg-4 col-xl-3'>
            <DestinationCard key={destination.id} destination={destination} onClick={handleClick} />
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <div className='row'>
            {cards}
         </div>
      </div>
   )
}

export default DestinationsContainer