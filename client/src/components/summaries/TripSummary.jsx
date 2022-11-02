import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripSummary (props) {
   const { trip } = props
   const { id, name, num_days, start_date, end_date, voting_deadline } = trip
   
   const navigate = useNavigate()
   const user = useSelector(state => state.user)
   
   return (
      <div>
         <h6> trip summary </h6>
         <ul>
            <li>name: {name}</li>
            <li>{num_days} { num_days > 1 ? 'days' : 'day' }</li>
            <li>voting closes {voting_deadline}</li>
            <li>depart: {start_date}</li>
            <li>return: {end_date}</li>
         </ul>
         {trip.owner_id === user.id ? <button type='button' onClick={() => {navigate('edit')}}>edit</button> : null}
      </div>
   )
}

export default TripSummary