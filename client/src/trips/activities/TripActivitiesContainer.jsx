import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TripActivityCard from './TripActivityCard'

function TripActivitiesContainer (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   const activities = useSelector(state => state.activities)

   const [tripActivities, setTripActivites] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setTripActivites)
            else console.log(r)
         })
      }
   }, [trip, dispatch])

   const AddBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('activities', {state: {from: location.pathname}})}
            >+ add activity</button>
      )
   }

   const cards = !!tripActivities ? tripActivities.map(activity => {
      return (
         <div key={activity.id} className='col col-12 col-xl-6 p-0'>
            <TripActivityCard key={activity.id} activity={activity} />
         </div>
      )
   }) : null

   console.log(trip)
   return (
      <div className='container'>
         <h3>must-do's</h3>
         <div className='row'>
            {cards}
         </div>
         <div className='row'>
            <div className='col'>
               {trip.trip_status.code >= 400 && trip.trip_status.code < 500  ? <AddBtn /> : (
                  trip.owner.id === user.id ? <AddBtn /> : null
               )}
            </div>
         </div>
      </div>
   )
}

export default TripActivitiesContainer