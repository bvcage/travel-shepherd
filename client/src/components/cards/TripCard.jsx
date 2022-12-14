import '../../assets/css/cards.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripCard (props) {
   const { trip } = props
   const { id, name, num_days, owner, trip_status } = trip
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)
   const navigate = useNavigate()

   function handleClick () {
      if (!!trip) {
         dispatch({type: 'trip/tripChosen', payload: trip})
         navigate('/trips/' + id, {state: {trip: trip}})
      }
   }

   const title = name.split(' to ')[0] + ' to'
   const title2 = name.slice(title.length)
   
   return (
      <div className='card' onClick={handleClick}>
         <div className='card-body'>
            <h5 className='card-title'>{!!trip.winning_proposal_id ? <>{title}<br />{title2}</> : name}</h5>
            <h6 className='card-subtitle'>{num_days} day{num_days > 1 ? 's' : null}</h6>
         </div>
         <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
               <div className='badge rounded-pill'>{owner.id === user.id ? 'organizer' : 'traveler'}</div>
               <div className={'badge rounded-pill ms-2 ' + (trip_status.name.includes('voting') ? 'bg-warning' : null)}>{trip_status.name}</div>
            </li>
         </ul>
      </div> 
   )
}

export default TripCard