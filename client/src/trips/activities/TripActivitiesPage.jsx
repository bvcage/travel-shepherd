import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BackBtn from '../../components/buttons/BackBtn'
import ActivityCard from '../../components/cards/ActivityCard'

function TripActivitiesContainer (props) {
   const trip = useSelector(state => state.trip)
   const activities = useSelector(state => state.activities)

   const [tripActivities, setTripActivities] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setTripActivities)
            else console.log(r)
         })
      }
   }, [trip])

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

   const tripActivitiesCards = tripActivities ? tripActivities.map(activity => {
      return (
         <div key={activity.id} className='col'>
         <ActivityCard key={'trip-' + activity.id} activity={activity} />
         </div>
      )
   }) : null

   const activitiesCards = activities ? activities
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

   return (
      <div>
         <h3>activities</h3>
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
         <BackBtn />
      </div>
   )
}

export default TripActivitiesContainer