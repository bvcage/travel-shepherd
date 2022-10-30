import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LoginBtn from '../components/buttons/LoginBtn'

function HomePage (props) {
   const location = useLocation()
   const path = location.pathname.split('/')
   return (
      <div>
         {!path.includes('login') && !path.includes('signup') ? <LoginBtn /> : null}
         <h1>Travel Shepherd</h1>
         <Outlet />
      </div>
   )
}

export default HomePage