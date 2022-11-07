import React from 'react'

function EventCard (props) {
   const { event } = props
   const { activity } = event
   
   let title = activity.activity_type.name
   switch (activity.activity_type.name) {
      case 'dine':
         title += ' at '
         break
      case 'participate':
         title += ' in activity at '
         break
      case 'travel':
         title += ' to '
         break
      default:
         break
   }
   title += JSON.parse(activity.place.name).join(' ')

   return (
      <div className='card'>
         <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6 className='card-subtitle'>{event.duration_in_minutes}</h6>
         </div>
      </div>
   )
}

export default EventCard