import '../assets/css/Pages.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function Template (props) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)
   
   useEffect(() => {
      fetch('/countries').then(r=>{
         if (r.ok) r.json().then(countries => dispatch({type: 'countries/countriesLoaded', payload: countries}))
         else console.log(r)
      })
   }, [dispatch])
   
   if (!user.id) return <Navigate to='/welcome' />
   return (
      <>
         <Header />
         <div id='main-content'>
            <Outlet />
         </div>
         <Footer />
      </>
   )
}

export default Template