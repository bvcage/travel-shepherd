// import './tables.css'

function ProposalVotesTable (props) {
   const { proposals } = props

   const rows = !!proposals ? proposals.map(proposal => {
      if (!proposal.destination) return <></>
      return (
         <tr key={proposal.id}>
            <td className='proposal-points'>{proposal.point_total}</td>
            <td>{proposal.destination.label}</td>
         </tr>
      )
   }) : null

   return (
      <table className='table table-striped table-bordered'>
         <thead className='table-success'>
            <tr>
               <th className='proposal-points'>points</th>
               <th>destination</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default ProposalVotesTable