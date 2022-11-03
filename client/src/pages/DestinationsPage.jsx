import { useEffect, useState } from 'react'
import DestinationsContainer from '../components/containers/DestinationsContainer'

function DestinationsPage (props) {

   const [destinations, setDestinations] = useState([])

   useEffect(() => {
      fetch('/destinations?sample=10').then(r=>{
         if (r.ok) r.json().then(setDestinations)
         else console.log(r)
      })
   }, [])
   
   return (
      <div className='container'>
         <h2>DestinationsPage</h2>
         <DestinationsContainer destinations={destinations} />
      </div>
   )
}

export default DestinationsPage