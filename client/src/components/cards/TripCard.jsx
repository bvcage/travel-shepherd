// import './cards.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripCard (props) {
   const { trip } = props
   const { id, name, num_days, owner } = trip
   const user = useSelector(state => state.user)
   const navigate = useNavigate()
   
   return (
      <div className='card' onClick={() => navigate('/trips/' + id, {state: {trip: trip}})}>
         <div className='card-body'>
            <h5 className='card-title'>{name}</h5>
            <h6 className='card-subtitle'>{num_days} day{num_days > 1 ? 's' : null}</h6>
         </div>
         <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
               <div className='badge rounded-pill'>{owner.id === user.id ? 'organizer' : 'traveler'}</div>
            </li>
         </ul>
      </div> 
   )
}

export default TripCard