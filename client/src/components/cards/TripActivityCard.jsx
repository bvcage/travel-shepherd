import React from 'react'

function TripActivityCard (props) {
   const { activity } = props
   const { activity_type, description, place } = activity

   const title = JSON.parse(place.name).join(' ')

   return (
      <div className='card position-relative'>
         <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6 className='card-subtitle'>{activity_type.name}</h6>
            <p>{JSON.parse(description).join(' ')}</p>
         </div>
      </div>
   )
}

export default TripActivityCard