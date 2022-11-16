import React, { useEffect, useState } from 'react'
import ActivityCard from './ActivityCard'

function ActivitiesContainer (props) {
   const { destination } = props
   const [activities, setActivities] = useState([])

   useEffect(() => {
      if (!!destination.id) {
         fetch(`/destinations/${destination.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setActivities)
            else console.log(r)
         })
      }
   }, [destination])

   const cards = !!activities ? activities.map(activity => {
      return (
         <div key={activity.id} className='col col-12 col-md-6 col-lg-4 col-xl-3'>
            <ActivityCard activity={activity} />
         </div>
      )
   }) : null

   if (!destination) return <></>
   return (
      <div className='container'>
         <h2>activities</h2>
         <div className='row'>
            {cards}
         </div>
      </div>
   )
}

export default ActivitiesContainer