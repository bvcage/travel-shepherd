import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Template (props) {
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