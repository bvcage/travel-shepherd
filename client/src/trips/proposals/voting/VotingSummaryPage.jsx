import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackBtn from '../../../components/buttons/BackBtn'
import ReleaseResultsBtn from '../../../components/buttons/ReleaseResultsBtn'
import VotingSummary from './VotingSummary'

function VotingSummaryPage (props) {
   const dispatch = useDispatch()
   const params = useParams()
   const trip = useSelector(state => state.trip)
   const [proposals, setProposals] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/proposals`).then(r=>{
            if (r.ok) r.json().then(setProposals)
            else console.log(r)
         })
      } else {
         fetch(`/trips/${params.id}`).then(r=>{
            if (r.ok) r.json().then(trip => dispatch({type: 'trip/tripChosen', payload: trip}))
         })
      }
   }, [params, trip, dispatch])

   if (!trip ||
       !proposals ) return <></>
   return (
      <div>
         <h2>voting summary for {trip.name}</h2>
         <VotingSummary proposals={proposals}/>
         {!!trip.winning_proposal_id ? null: <ReleaseResultsBtn trip={trip} />}
         <BackBtn />
      </div>
   )
}

export default VotingSummaryPage