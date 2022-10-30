import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const selectUser = state => state.user

function Template (props) {
   const user = useSelector(selectUser)
   if (!user.id) return <Navigate to='/welcome' />
   return (
      <div>
         <Header />
         <div id='main-content'>
            <Outlet />
         </div>
         <Footer />
      </div>
   )
}

export default Template