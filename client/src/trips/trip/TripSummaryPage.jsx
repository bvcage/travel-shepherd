import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'
import ProposalsContainer from '../proposals/ProposalsContainer'
import TravelersContainer from '../travelers/TravelersContainer'
import TripActivitiesContainer from '../activities/TripActivitiesContainer'
import ProposalVotingContainer from '../voting/ProposalVotingContainer'
import TripSummary from '../trip/TripSummary'
import ActivityVotingContainer from '../voting/ActivityVotingContainer'
import ItineraryContainer from '../events/ItineraryContainer'

function TripSummaryPage (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams()
   const trip = useSelector(state => state.trip)

   useEffect(() => {
      fetch(`/trips/${id}`).then(r=>{
         if (r.ok) r.json().then(trip => dispatch({type: 'trip/tripChosen', payload: trip}))
         else console.log(r)
      })
   }, [id, dispatch])

   useEffect(() => {
      if (!!trip.destination && !!trip.destination.id) {
         fetch(`/destinations/${trip.destination.id}/activities`).then(r=>{
            if (r.ok) r.json().then(activities => dispatch({type: 'activities/activitiesLoaded', payload: activities}))
            else console.log(r)
         })
      }
   }, [trip, dispatch])

   return (
      <div className='container'>
         <h2 className='page-header'>{trip.name}</h2>
         <div className='page-content'>
            <div className='container'>
               {/* summary component */}
               <div className='row'>
                  <TripSummary trip={trip} />
               </div>
               {/* voting component */}
               <div className='row'>
                  {!!trip.trip_status && trip.trip_status.code === 600 
                     ? <ItineraryContainer /> 
                     : !!trip.winning_proposal_id 
                        ? <ActivityVotingContainer /> 
                        : <ProposalVotingContainer />
                  }
               </div>
               <div className='row'>
                  <div className='col col-12 col-xl-6'>
                     {!!trip.winning_proposal_id ? <TripActivitiesContainer /> : <ProposalsContainer trip={trip} />}
                  </div>
                  <div className='col col-12 col-xl-6'>
                     <TravelersContainer trip={trip} mayInvite={true} />
                  </div>
               </div>
               <div className='row mb-3'>
                  {}
               </div>
               <div className='row fin'>
                  <div>
                     <BackBtn />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TripSummaryPage