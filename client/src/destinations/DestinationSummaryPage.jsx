import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import DestinationSummary from './DestinationSummary'

function DestinationSummaryPage (props) {
   const params = useParams()
   const [destination, setDestination] = useState({})

   useEffect(() => {
      if (!!params.id) {
         fetch(`/destinations/${params.id}`).then(r=>{
            if (r.ok) r.json().then(setDestination)
            else console.log(r)
         })
      }
   }, [params])

   const title = !!destination.locality ? destination.locality + ', ' + destination.country.name : ''

   return (
      <div className='container'>
         <h2>{title}</h2>
         <DestinationSummary destination={destination} />
         <BackBtn />
      </div>
   )
}

export default DestinationSummaryPage