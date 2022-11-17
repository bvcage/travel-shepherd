import '../assets/css/cards.css'
import React from 'react'

function DestinationCard (props) {
   const { destination, onClick } = props
   const { id, locality, region, country, image_src } = destination

   const title = !!locality ? locality : `${country.name} ${country.flag}`
   const subtitle = !!locality ? (!!region ? region + ', ' : '') + `${country.name}\xa0${country.flag}` : null
   const imgSrc = image_src ? image_src : "https://picsum.photos/200"

   if (!id) return <></>
   return (
      <div className='card destination-card' onClick={() => onClick(id)}>
         <img className='card-img-top' src={imgSrc} alt={country.name} />
         <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            {subtitle ? <h6 className='card-subtitle'>{subtitle}</h6> : null }
         </div>
      </div>
   )
}

export default DestinationCard