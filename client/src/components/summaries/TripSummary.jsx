import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripSummary (props) {
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   
   const { id, name, num_days, start_date, end_date, voting_deadline, owner } = trip
   
   if (!trip ||
       !trip.owner ) return <></>
   return (
      <div className='container'>
         <h6>trip summary component</h6>
         <ul>
            <li>name: {name}</li>
            <li>organizer: {owner.full_name}</li>
            <li>{num_days} { num_days > 1 ? 'days' : 'day' }</li>
            <li>voting closes on: {voting_deadline}</li>
            <li>depart: {start_date}</li>
            <li>return: {end_date}</li>
         </ul>
         {trip.owner.id === user.id ? <button type='button' onClick={() => {navigate('edit')}}>edit</button> : null}
      </div>
   )
}

export default TripSummary