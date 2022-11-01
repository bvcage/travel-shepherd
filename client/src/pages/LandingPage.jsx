import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserInvitesContainer from '../components/containers/UserInvitesContainer'
import TripsContainer from '../components/containers/TripsContainer'

function LandingPage (props) {
   const user = useSelector(state => state.user)
   if (!user.id) return (<Navigate to='/welcome' />)

   return (
      <div>
         <h2>landing page</h2>
         <UserInvitesContainer pendingOnly={true} />
         <TripsContainer />
      </div>
   )
}

export default LandingPage