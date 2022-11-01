import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserInvitesContainer from '../components/containers/UserInvitesContainer'
import TripsContainer from '../components/containers/TripsContainer'

function LandingPage (props) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)
   
   useEffect(() => {
      if (!!user.id) {
         fetch(`/users/${user.id}/trips`).then(r=>{
            if (r.ok) r.json().then(trips => dispatch({type: 'trips/tripsLoaded', payload: trips}))
            else console.log(r)
         })
      }
   }, [user, dispatch])
   
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