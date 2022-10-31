import React from 'react'

function TripCard (props) {
   const { trip } = props
   const { name, num_days } = trip
   return (
      <div className='card'>
         <div>{name}</div>
         <p>{num_days} day{num_days > 1 ? 's' : null}</p>
      </div>
   )
}

export default TripCard