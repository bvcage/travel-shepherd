import React from 'react'

function PlaceCard (props) {
   const { place } = props
   console.log(place)
   return (
      <div className='card'>
         <div className='card-body'>
            place
         </div>
      </div>
   )
}

export default PlaceCard