import React from 'react'
import ReleaseResultsBtn from '../buttons/ReleaseResultsBtn'
import ProposalVotesTable from '../tables/ProposalVotesTable'

function VotingSummary (props) {
   const { proposals } = props

   if (!proposals) return <></>
   return (
      <div className='container'>
         <ProposalVotesTable proposals={proposals} />
         <ReleaseResultsBtn />
      </div>
   )
}

export default VotingSummary