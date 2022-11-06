import { useEffect, useState } from 'react'
import DestinationsContainer from '../components/containers/DestinationsContainer'

function DestinationsPage (props) {

   const [destinations, setDestinations] = useState([])

   useEffect(() => {
      fetch('/destinations?sample=9').then(r=>{
         if (r.ok) r.json().then(setDestinations)
         else console.log(r)
      })
   }, [])
   
   return (
      <div className='container'>
         <h2 className='page-title'>explore destinations</h2>
         <div className='page-content'>
            <DestinationsContainer destinations={destinations} />
            <h6 className='fin'>fin</h6>
         </div>
      </div>
   )
}

export default DestinationsPage