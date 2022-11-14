import '../assets/css/cards.css'
import React from 'react'

function DestinationCard (props) {
   const { destination, onClick } = props
   const { id, municipality, region, country } = destination

   const title = !!municipality ? municipality : `${country.name} ${country.flag}`
   const subtitle = (title === municipality) ? (!!region ? region + ', ' : '') + `${country.name} ${country.flag}` : null
   const imgSrc = "https://picsum.photos/200"

   if (!id) return <></>
   return (
      <div className='card destination-card' onClick={() => onClick(id)}>
         <img className='card-img-top' src={imgSrc} alt={country.name} />
         <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            {subtitle ? <h6 className='card-subtitle'>{subtitle}</h6> : null }
         </div>
         {/* <div className='card-body'>
            <h5 className='card-title'>{capitalize(title)} {country.flag}</h5>
            <h6 className='card-subtitle'>{capitalize(subtitle)}</h6>
         </div> */}
      </div>
   )
}

export default DestinationCard