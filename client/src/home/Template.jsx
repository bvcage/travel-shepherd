import '../assets/css/Pages.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function Template (props) {
   const dispatch = useDispatch()
   const countries = useSelector(state => state.countries)
   const user = useSelector(state => state.user)
   
   useEffect(() => {
      if (!countries) {
         fetch('/countries').then(r=>{
            if (r.ok) r.json().then(countries => dispatch({type: 'countries/countriesLoaded', payload: countries}))
            else console.log(r)
         })
      }
   }, [countries, dispatch])
   
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