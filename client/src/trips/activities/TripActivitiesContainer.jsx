import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import TripActivityCard from './TripActivityCard'

function TripActivitiesContainer (props) {
   const location = useLocation()
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const activities = useSelector(state => state.activities)

   const [tripActivities, setTripActivites] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setTripActivites)
            else console.log(r)
         })
      }
   }, [trip, activities])

   const cards = !!tripActivities ? tripActivities.map(activity => {
      return (
         <TripActivityCard key={activity.id} activity={activity} />
      )
   }) : null

   return (
      <div>
         <h3>must-do's</h3>
         {cards}
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('activities', {state: {from: location.pathname}})}
            >+ add activity</button>
      </div>
   )
}

export default TripActivitiesContainer