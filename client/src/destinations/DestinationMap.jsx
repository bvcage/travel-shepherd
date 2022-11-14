import React from 'react'
import { useEffect, useRef, useState } from 'react'

function DestinationMap (props) {
   const { destination } = props
   let { lat, lon } = destination

   const ref = useRef(null)
   const [map, setMap] = useState()

   useEffect(() => {
      if (ref.current && lat && lon && !map) {
         setMap(new window.google.maps.Map(ref.current, {
            center: { lat: lat, lng: lon },
            zoom: 9,
            disableDefaultUI: true,
         }))
      }
   }, [ref, map, lat, lon])

   return (
      <div ref={ref} style={{width: '100%', height: '400px'}} />
   )
}

export default DestinationMap