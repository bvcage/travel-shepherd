import React from 'react'
import { useSelector } from 'react-redux'

function TripActivitiesContainer (props) {
   const trip = useSelector(state => state.trip.info)

   return (
      <div>
         <h3>must-do's</h3>
         <button type='button'
            className='btn btn-primary'
            >+ add activity</button>
      </div>
   )
}

export default TripActivitiesContainer