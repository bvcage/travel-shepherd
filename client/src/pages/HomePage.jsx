import React from 'react'
import { Outlet } from 'react-router-dom'

function HomePage (props) {
   return (
      <div>
         <h1>Travel Shepherd</h1>
         <Outlet />
      </div>
   )
}

export default HomePage