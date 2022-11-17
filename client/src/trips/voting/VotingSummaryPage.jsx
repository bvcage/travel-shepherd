import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackBtn from '../../components/buttons/BackBtn'
import ReleaseResultsBtn from './ReleaseResultsBtn'
import ProposalVotesTable from './ProposalVotesTable'
import VotingSummary from './VotingSummary'
import ActivityVotesTable from './ActivityVotesTable'

function VotingSummaryPage (props) {
   const dispatch = useDispatch()
   const params = useParams()
   const trip = useSelector(state => state.trip)
   const [proposals, setProposals] = useState([])
   const [activities, setActivities] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/proposals`).then(r=>{
            if (r.ok) r.json().then(setProposals)
            else console.log(r)
         })
         fetch(`/trips/${trip.id}/activities`).then(r=>{
            if (r.ok) r.json().then(setActivities)
            else console.log(r)
         })
      } else {
         fetch(`/trips/${params.id}`).then(r=>{
            if (r.ok) r.json().then(trip => dispatch({type: 'trip/tripChosen', payload: trip}))
         })
      }
   }, [params, trip, dispatch])

   if (  !trip ||
         !proposals ||
         !activities    ) return <></>
   return (
      <div className='container'>
         <h2>voting summary for {trip.name}</h2>
         <ProposalVotesTable proposals={proposals}/>
         {!!trip.winning_proposal_id ? null: <ReleaseResultsBtn trip={trip} />}
         <ActivityVotesTable activities={activities} />
         <BackBtn />
      </div>
   )
}

export default VotingSummaryPage