import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginBtn from '../components/buttons/LoginBtn'


function HomePage (props) {
   const location = useLocation()
   const path = location.pathname.split('/')
   
   const username = useSelector(state => state.user.username)
   if (!!username) return (<Navigate to='/home' />)
   
   return (
      <div className='container'>
         <h1>Travel Shepherd</h1>
         {!path.includes('login') && !path.includes('signup') ? <LoginBtn /> : null}
         <Outlet />
      </div>
   )
}

export default HomePage