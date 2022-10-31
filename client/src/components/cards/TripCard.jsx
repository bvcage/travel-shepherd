import React from 'react'
import { useNavigate } from 'react-router-dom'

function TripCard (props) {
   const { trip } = props
   const { id, name, num_days } = trip
   const navigate = useNavigate()
   return (
      <div className='card' onClick={() => navigate(`${id}`, {state: {trip: trip}})}>
         <div>{name}</div>
         <p>{num_days} day{num_days > 1 ? 's' : null}</p>
      </div>
   )
}

export default TripCard