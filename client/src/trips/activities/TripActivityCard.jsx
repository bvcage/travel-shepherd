import './TripActivities.css'

function TripActivityCard (props) {
   const { activity } = props
   const { activity_type, description, place } = activity
   
   return (
      <div className='card position-relative trip-activity'>
         <div className='card-body'>
            <h5 className='card-title'>{place.name}</h5>
            <h6 className='card-subtitle'>{activity_type.name}</h6>
         </div>
      </div>
   )
}

export default TripActivityCard