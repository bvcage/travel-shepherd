import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const selectUser = state => state.user
const selectTrips = state => state.trips

function UserTripsPage (props) {
   const user = useSelector(selectUser)
   const trips = useSelector(selectTrips)

   const dispatch = useDispatch()

   useEffect(() => {
      if (!!user) fetch(`/users/${user.id}/trips`).then(r=>{
         if (r.ok) r.json().then(trips => {
            dispatch({type: 'trips/tripsLoaded', payload: trips})
         })
      })
   }, [user, dispatch])

   return (
      <div className='container'>
         <Outlet />
      </div>
   )
}

export default UserTripsPage