import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

function EventsCalendar (props) {
   const { events } = props
   
   const itinerary = !!events ? events.map(event => {
      let title = event.activity.activity_type.name
      switch (event.activity.activity_type.name) {
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
      title += JSON.parse(event.activity.place.name).join(' ')
      return {
         id: event.id,
         title: title,
         start: new Date(event.start_time),
         end: new Date(event.end_time)
      }
   }) : null
   
   return (
      <div>
         <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            events={itinerary}
            headerToolbar={{
               center: 'timeGridWeek,timeGridDay,listWeek',
            }}
            slotDuration='00:30'
         />
      </div>
   )
}

export default EventsCalendar