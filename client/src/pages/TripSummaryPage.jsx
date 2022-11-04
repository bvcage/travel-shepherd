import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import ProposalsContainer from '../components/containers/ProposalsContainer'
import TravelersContainer from '../components/containers/TravelersContainer'
import TripSummary from '../components/summaries/TripSummary'

function TripSummaryPage (props) {
   const { id } = useParams()
   const [trip, setTrip] = useState({})

   useEffect(() => {
      fetch(`/trips/${id}`).then(r=>{
         if (r.ok) r.json().then(trip => setTrip(trip))
         else console.log(r)
      })
   }, [id])

   return (
      <div className='container'>
         <h3>Trip Summary</h3>
         <TripSummary trip={trip} />
         <TravelersContainer trip={trip} mayInvite={true} />
         <ProposalsContainer trip={trip} />
         <BackBtn />
      </div>
   )
}

export default TripSummaryPage