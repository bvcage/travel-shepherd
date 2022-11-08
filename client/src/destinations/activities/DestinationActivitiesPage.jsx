import './DestinationActivities.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivityCard from './ActivityCard'

function DestinationActivitiesPage (props) {
   const params = useParams()
   const [destination, setDestination] = useState({})
   const [activities, setActivities] = useState([])

   useEffect(() => {
      if (!!params.id) {
         fetch(`/destinations/${params.id}`).then(r=>{
            if (r.ok) r.json().then(setDestination)
            else console.log(r)
         })
         fetch(`/destinations/${params.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setActivities)
            else console.log(r)
         })
      }
   }, [params])

   const cards = !!activities ? activities.map(activity => {
      return (
         <div key={activity.id} className='col col-12 col-md-6 col-lg-4 col-xl-3'>
            <ActivityCard activity={activity} />
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <h2>things to do in {destination.name}</h2>
         <div className='row'>
            {cards}
         </div>
      </div>
   )
}

export default DestinationActivitiesPage