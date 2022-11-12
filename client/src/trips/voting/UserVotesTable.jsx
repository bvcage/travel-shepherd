import '../../assets/css/tables.css'
import { useSelector } from 'react-redux'

function UserVotesTable (props) {
   const trip = useSelector(state => state.trip)
   const { travelers } = trip

   const rows = !!travelers ? travelers.map(traveler => {
      return (
         <tr key={traveler.id}>
            <td>{traveler.user.first_name}</td>
            <td className='voting-status'>
               { trip.trip_status.code >= 500 && trip.trip_status.code < 600
                  ? (traveler.has_voted_for_activities
                     ? <span className='badge bg-success'>complete</span>
                     : <span className='badge bg-warning'>pending</span>)
                  : (traveler.has_voted_for_proposal
                     ? <span className='badge bg-success'>complete</span>
                     : <span className='badge bg-warning'>pending</span>)
               }
            </td>
         </tr>
      )
   }) : null

   return (
      <table id='user-votes-table' className='table align-middle table-striped'>
         <thead>
            <tr>
               <th>companion</th>
               <th className='voting-status'>status</th>
            </tr>
         </thead>
         <tbody>
            {rows}
         </tbody>
      </table>
   )
}

export default UserVotesTable