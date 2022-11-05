import './tables.css'
import { useSelector } from 'react-redux'

function UserVotesTable (props) {
   const trip = useSelector(state => state.trip)
   const { travelers } = trip

   const rows = !!travelers ? travelers.map(traveler => {
      return (
         <tr key={traveler.id}>
            <td>{traveler.user.first_name}</td>
            <td className='voting-status'>{traveler.has_voted ? <span className='badge bg-success'>complete</span> : <span className='badge bg-warning'>pending</span> }
            </td>
         </tr>
      )
   }) : null

   return (
      <table className='table align-middle'>
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