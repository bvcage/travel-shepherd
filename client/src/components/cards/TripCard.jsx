import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripCard (props) {
   const { trip } = props
   const { id, name, num_days, owner } = trip
   const user = useSelector(state => state.user)
   const navigate = useNavigate()
   
   return (
      <div className='card' onClick={() => navigate('/trips/' + id, {state: {trip: trip}})}>
         <div className='card-content'>
            <h5 className='card-title'>{name}</h5>
            <h6 className='card-subtitle'>{num_days} day{num_days > 1 ? 's' : null}</h6>
            <div className='badge rounded-pill text-bg-dark'>{owner.id === user.id ? 'organizer' : 'traveler'}</div>
         </div>
      </div>
   )
}

export default TripCard