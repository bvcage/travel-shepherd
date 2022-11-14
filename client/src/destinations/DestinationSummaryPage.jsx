import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import DestinationSummary from './DestinationSummary'

function DestinationSummaryPage (props) {
   const location = useLocation()
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

   return (
      <div className='container'>
         <h2>{destination.label}</h2>
         <DestinationSummary destination={destination} />
         <BackBtn path={!!location.state && !!location.state.from ? location.state.from : null} />
      </div>
   )
}

export default DestinationSummaryPage