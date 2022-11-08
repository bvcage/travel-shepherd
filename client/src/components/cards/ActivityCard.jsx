import React from 'react'

function ActivityCard (props) {
   const { activity, onClickAdd } = props
   const { activity_type, description, place } = activity

   const title = JSON.parse(place.name).join(' ')
   const imgSrc = "https://picsum.photos/200"

   function handleClick () {
      onClickAdd(activity)
   }

   return (
      <div className='card position-relative'>
         <button className='btn btn-add-activity' onClick={handleClick}>+</button>
         <img src={imgSrc} alt={title} className='card-img-top' />
         <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6 className='card-subtitle'>{activity_type.name}</h6>
            <p>{JSON.parse(description).join(' ')}</p>
         </div>
      </div>
   )
}

export default ActivityCard