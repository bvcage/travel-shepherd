import './trip.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TripSummary (props) {
   const navigate = useNavigate()
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)
   
   const { id, name, num_days, start_date, end_date, owner } = trip

   const EditBtn = () => {
      return (
         <button type='button'
            className='btn btn-secondary'
            onClick={() => {navigate('edit')}}
            >edit</button>
      )
   }
   
   if (!trip ||
       !trip.owner ) return <></>
   return (
      <div id='trip-summary-container' className='container'>
         <div className='row'>
            <div className='col col-12 col-md'>organizer: {owner.full_name}</div>
            {!!start_date ? <div className='col col-12 col-md'>depart: {start_date}</div> : null}
            {!!end_date ? <div className='col col-12 col-md'>return: {end_date}</div> : null}
            {!!num_days ? <div className='col col-12 col-md'>{num_days} { num_days > 1 ? 'days' : 'day' }</div> : null }
            {!!trip.owner && trip.owner.id === user.id ? <div className='col col-12 col-md-auto'><EditBtn /></div> : null}
         </div>
      </div>
   )
}

export default TripSummary