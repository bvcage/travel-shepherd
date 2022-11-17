import { useSelector } from 'react-redux'
import TripCard from '../components/cards/TripCard'
import UserInvitesContainer from './UserInvitesContainer'

function UserTripsContainer (props) {
   const trips = useSelector(state => state.trips)

   const cards = !!trips[0] ? trips.map(trip => {
      return (
         <div key={trip.id} className='col col-12 col-md-6 col-xl-3 mb-3'>
            <div className='container-fluid p-0'>
               <TripCard key={trip.id} trip={trip} />
            </div>
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <UserInvitesContainer />
         <h2 className='page-header'>my trips</h2>
         <div className='page-content'>
            <div className='row'>
               {cards}
            </div>
         </div>
      </div>
   )
}

export default UserTripsContainer