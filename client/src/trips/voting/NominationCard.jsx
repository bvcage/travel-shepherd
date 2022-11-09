import React from 'react'

function NominationCard (props) {
   const { activity } = props
   const { name, description, place } = activity
   return (
      <div className='card'>
         <div className='card-body'>
            <h5 className='card-title'>{name}</h5>
            <h6 className='card-subtitle'>at {place.name}</h6>
            <p>{description}</p>
         </div>
      </div>
   )
}

export default NominationCard