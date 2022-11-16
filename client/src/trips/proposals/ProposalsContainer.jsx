import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProposalCard from './ProposalCard'

function ProposalsContainer (props) {
   const trip = useSelector(state => state.trip)
   const navigate = useNavigate()
   const [proposals, setProposals] = useState([])

   useEffect(() => {
      if (!!trip.id) {
         fetch(`/trips/${trip.id}/proposals`).then(r=>{
            if (r.ok) r.json().then(setProposals)
            else console.log(r)
         })
      }
   }, [trip])

   function handleClick (goToId) {
      navigate('/destinations/' + goToId, {state: {from: '/trips/'+trip.id}})
   }

   const NewProposalBtn = () => {
      return (
         <button type='button'
            className='btn btn-primary'
            onClick={() => navigate('proposals/new')}
            >+ make proposal</button>
      )
   }

   const cards = !!proposals ? proposals.map(proposal => {
      return (
         <div key={proposal.id} className='col col-12 col-md-6'>
            <div className='container-fluid p-0'>
               <ProposalCard key={proposal.id} proposal={proposal} onClick={handleClick} />
            </div>
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <h3>Proposals</h3>
         <div className='row'>
            {cards}
         </div>
         {(trip.allow_proposals ||
            trip.allow_proposals === null) &&
            !trip['proposal_voting_is_open?'] &&
            (trip.proposal_voting_closes_at === null ||
               trip.proposal_voting_closes_at > Date.now())
            ? <NewProposalBtn /> : null}
      </div>
   )
}

export default ProposalsContainer