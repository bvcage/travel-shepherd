import React from 'react'

function ActivityVotesTable (props) {
   const { activities } = props

   const rows = !!activities ? activities.map(activity => {
      return (
         <tr key={activity.id}>
            <td>{activity.points}</td>
            <td>{activity.name}</td>
         </tr>
      )
   }) : null

   return (
      <table className='table table-striped table-bordered'>
         <thead className='table-success'>
            <tr>
               <th scope='col'>points</th>
               <th scope='col'>activity</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default ActivityVotesTable