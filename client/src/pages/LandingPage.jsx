import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const selectUser = state => state.user

function LandingPage (props) {
   const user = useSelector(selectUser)
   if (!user.username) return (<Navigate to='/welcome' />)
   return (
      <div>
         <h2>landing page</h2>
      </div>
   )
}

export default LandingPage