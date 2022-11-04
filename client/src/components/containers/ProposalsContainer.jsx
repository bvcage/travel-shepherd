import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationCard from '../cards/DestinationCard'

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
      console.log(goToId)
   }

   const cards = !!proposals ? proposals.map(proposal => {
      return (
         <DestinationCard key={proposal.id} destination={proposal.destination} onClick={handleClick} />
      )
   }) : null

   return (
      <div className='container'>
         {cards}
         {trip.allow_proposals || trip.allow_proposals === null ? <button type='button' onClick={() => navigate('proposal')}>+ make proposal</button> : null}
      </div>
   )
}

export default ProposalsContainer