import './TripActivities.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'
import ActivityCard from '../../destinations/activities/ActivityCard'
import TripActivityCard from './TripActivityCard'
import { useCallback } from 'react'

function TripActivitiesContainer (props) {
   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()
   const trip = useSelector(state => state.trip)
   const destination = useSelector(state => state.trip.destination)
   const activities = useSelector(state => state.activities)
   const [tripActivities, setTripActivities] = useState([])

   // ensure trip is loaded
   useEffect(() => {
      if (!!params.id && !trip.id) {
         fetch(`/trips/${params.id}`).then(r=>{
            if (r.ok) r.json().then(trip => dispatch({type: 'trip/tripChosen', payload: trip}))
            else console.log(r)
         })
      }
   }, [params, trip, dispatch])

   // load trip activities
   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setTripActivities)
            else console.log(r)
         })
      }
   }, [trip])

   // manage passed state
   useEffect(() => {
      if (Object.keys(location.state).length > 0) {
         Object.entries(location.state).forEach(([key, value]) => {
            switch (key) {
               case 'activity':
                  fetch('/proposed_itineraries', {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                        'proposal_id': trip.winning_proposal_id,
                        'activity_id': value.id
                     })
                  })
                  setTripActivities([...tripActivities, value])
                  delete location.state[key]
                  break
               default:
                  break
            }
         })
      }
   }, [location.state, trip, tripActivities])

   function handleAddToTrip (activity) {
      const post = {
         'proposal_id': trip.winning_proposal_id,
         'activity_id': activity.id
      }
      fetch('/proposed_itineraries', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(post)
      }).then(r=>{
         if (r.ok) r.json().then(data => {
            setTripActivities([...tripActivities, data.activity])
         })
         else console.log(r)
      })
   }

   const CreateActivityBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate(`/destinations/${destination.id}/activities/new`, {state: {from: location.pathname}})}
            >+ create activity</button>
      )
   }

   const tripActivitiesCards = !!tripActivities ? tripActivities.map(activity => {
      return (
         <div key={activity.id} className='col col-12 col-sm-6 col-md-4 col-xl-3'>
            <TripActivityCard key={'trip-' + activity.id} activity={activity} />
         </div>
      )
   }) : null

   const activitiesCards = !!activities ? activities
      .filter(activity => !tripActivities.map(ta=>ta.name.toLowerCase()).includes(activity.name.toLowerCase()))
      .map(activity => {
         return (
            <div key={'explore-' + activity.id} className='col col-12 col-sm-6 col-md-4 col-lg'>
               <div className='container'>
                  <ActivityCard onClickAdd={handleAddToTrip} activity={activity} />
               </div>
            </div>
         )
      }) : null

   if (!destination) return <></>
   return (
      <div className='container'>
         <h3>activities in {destination.name}</h3>
         {!!tripActivities && tripActivities.length > 0 ? <>
            <h4>nominated</h4>
            <div className='row'>
               {tripActivitiesCards}
            </div>
            </> : null }
         <h4>explore</h4>
         <div className='row'>
            {activitiesCards}
         </div>
         <CreateActivityBtn />
         <BackBtn />
      </div>
   )
}

export default TripActivitiesContainer