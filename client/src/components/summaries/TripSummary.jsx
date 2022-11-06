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
      <div className='container'>
         <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 col-xl'>organizer: {owner.full_name}</div>
            {!!start_date ? <div className='col-12 col-md-6 col-lg-4 col-xl'>depart: {start_date}</div> : null}
            {!!end_date ? <div className='col-12 col-md-6 col-lg-4 col-xl'>return: {end_date}</div> : null}
            <div className='col-12 col-md-6 col-lg-4 col-xl'>{num_days} { num_days > 1 ? 'days' : 'day' }</div>
            <div className='col-12 col-md-6 col-lg-4 col-xl'>{trip.owner.id === user.id ? <EditBtn /> : null}</div>
         </div>
      </div>
   )
}

export default TripSummary