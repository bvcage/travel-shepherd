import React from 'react'
import ProposalVotesTable from './ProposalVotesTable'

function VotingSummary (props) {
   const { proposals } = props

   if (!proposals) return <></>
   return (
      <div className='container'>
         <ProposalVotesTable proposals={proposals} />
      </div>
   )
}

export default VotingSummary