import React from 'react'
import { Outlet } from 'react-router-dom'

function LandingPage (props) {
   return (
      <div>
         <h2>LandingPage</h2>
         <Outlet />
      </div>
   )
}

export default LandingPage