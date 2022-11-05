import { useSelector } from 'react-redux'
import VotingAdminContainer from './VotingAdminContainer'

function VotingContainer (props) {
   const trip = useSelector(state => state.trip)
   const user = useSelector(state => state.user)

   if (!trip.id) return <></>
   return (
      <div className='container'>
         <h4>Voting Container</h4>
         {trip.voting_is_open ? 'you need to vote' : 'voting is closed'}
         {user.id === trip.owner.id ? <VotingAdminContainer trip={trip} /> : null}
      </div>
   )
}

export default VotingContainer