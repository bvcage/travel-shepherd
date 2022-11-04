import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProposalCard from '../cards/ProposalCard'

function ProposalsContainer (props) {
   const { trip } = props
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
      navigate('proposals/' + goToId)
   }

   const cards = !!proposals ? proposals.map(proposal => {
      return (
         <ProposalCard key={proposal.id} proposal={proposal} onClick={handleClick} />
      )
   }) : null

   return (
      <div className='container'>
         {cards}
         {trip.allow_proposals || trip.allow_proposals === null ? <button type='button' onClick={() => navigate('proposals/new')}>+ make proposal</button> : null}
      </div>
   )
}

export default ProposalsContainer