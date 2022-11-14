import React, { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import DestinationMap from './DestinationMap'

function DestinationSummary (props) {
   const { destination } = props
   const ref = useRef(null)
   const [map, setMap] = useState()

   useEffect(() => {
      if (ref.current === null) {

      }
      if (ref.current && !map) {
         setMap(new window.google.maps.Map(ref.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
         }))
      }
   }, [ref, map])


   return (
      <div className='container'>
         <Wrapper apiKey={'AIzaSyCMrrg8fJ3bv8zc8Y6_L41zHoOwH8fK0JM'}>
            <DestinationMap destination={destination} />
         </Wrapper>
         <h4>summary</h4>
         <p>{destination.summary}</p>
         <p>{destination.description}</p>
      </div>
   )
}

export default DestinationSummary