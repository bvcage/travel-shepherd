import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'
import ProposalsContainer from '../proposals/ProposalsContainer'
import TravelersContainer from '../travelers/TravelersContainer'
import TripActivitiesContainer from '../activities/TripActivitiesContainer'
import VotingContainer from '../proposals/voting/VotingContainer'
import TripSummary from '../trip/TripSummary'

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
         <h2 className='page-header'>{trip.name} Trip</h2>
         <div className='page-content'>
            <div className='row mb-3'>
               <TripSummary trip={trip} />
            </div>
            <div className='row mb-3'>
               {/* <ItineraryContainer /> */}
            </div>
            <div className='row mb-3'>
               <div className='col col-12 col-md-6'>
                  <TravelersContainer trip={trip} mayInvite={true} />
               </div>
               <div className='col col-12 col-md-6'>
                  {!!trip.winning_proposal ? <TripActivitiesContainer /> : <ProposalsContainer trip={trip} />}
               </div>
            </div>
            <div className='row mb-3'>
               {!!trip.winning_proposal_id ? null : <VotingContainer />}
            </div>
            <div className='row fin'>
               <div>
                  <BackBtn />
               </div>
            </div>
         </div>
      </div>
   )
}

export default TripSummaryPage