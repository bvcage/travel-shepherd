import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackBtn from '../components/buttons/BackBtn'
import ProposalsContainer from '../components/containers/ProposalsContainer'
import TravelersContainer from '../components/containers/TravelersContainer'
import VotingContainer from '../components/containers/VotingContainer'
import TripSummary from '../components/summaries/TripSummary'

function TripSummaryPage (props) {
   const dispatch = useDispatch()
   const { id } = useParams()
   const trip = useSelector(state => state.trip)

   useEffect(() => {
      fetch(`/trips/${id}`).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/tripChosen', payload: trip}))
         else console.log(r)
      })
   }, [id, dispatch])

   return (
      <div className='container'>
         <h3>Trip Summary</h3>
         <TripSummary trip={trip} />
         {!!trip.winning_proposal_id ? null : <VotingContainer />}
         <TravelersContainer trip={trip} mayInvite={true} />
         {!!trip.winning_proposal_id ? null : <ProposalsContainer trip={trip} />}
         <BackBtn />
      </div>
   )
}

export default TripSummaryPage