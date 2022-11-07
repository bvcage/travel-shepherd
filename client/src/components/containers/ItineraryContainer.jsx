import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EventCard from '../cards/EventCard'
import EventsCalendar from './EventsCalendar'

function ItineraryContainer (props) {
   const trip = useSelector(state => state.trip)
   // const itinerary = useSelector(state => state.trip.itinerary)
   const [itinerary, setItinerary] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/itinerary`).then(r=>{
            if (r.ok) r.json().then(setItinerary)
            else console.log(r)
         })
      }
   }, [trip])

   const cards = itinerary.map(event => <EventCard key={event.id} event={event} />)

   return (
      <div>
         <h3>Itinerary</h3>
         <EventsCalendar events={itinerary} />
      </div>
   )
}

export default ItineraryContainer