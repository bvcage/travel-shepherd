import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserInvitesContainer from '../users/UserInvitesContainer'
import TripsContainer from '../users/UserTripsContainer'

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
      <div className='container'>
         <UserInvitesContainer pendingOnly={true} />
         <TripsContainer />
      </div>
   )
}

export default LandingPage