
function ActivityCard (props) {
   const { activity, onClickAdd } = props
   const { activity_type, description, place } = activity

   const imgSrc = "https://picsum.photos/200"

   function handleClick () {
      onClickAdd(activity)
   }

   return (
      <div className='card activity-card position-relative'>
         <div className='row g-0'>
            <div className='col col-md-4'>
               <img src={imgSrc} alt={place.name} className='img-fluid' />
            </div>
            <div className='col col-md-8'>
               <div className='card-body'>
                  <h5 className='card-title'>{place.name}</h5>
                  <h6 className='card-subtitle'>{activity_type.name}</h6>
               </div>
            </div>
         </div>
         <button
            className='btn btn-add-activity'
            onClick={handleClick}
            >+</button>
      </div>
   )
}

export default ActivityCard