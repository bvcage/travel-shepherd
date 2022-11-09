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
      <table className='table'>
         <thead>
            <tr>
               <th>points</th>
               <th>activity</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default ActivityVotesTable