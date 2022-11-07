import '../css/HomePage.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginBtn from '../components/buttons/LoginBtn'

function HomePage (props) {
   const location = useLocation()
   const path = location.pathname.split('/')
   
   const username = useSelector(state => state.user.username)
   if (!!username) return (<Navigate to='/home' />)
   
   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col col-md-7 col-lg-8'>
               <h1>Travel Shepherd</h1>
            </div>
            <div id='login' className='col col-md-5 col-lg-4'>
               {/* {!path.includes('login') && !path.includes('signup') ? <LoginBtn /> : null} */}
               <div>
                  <h1>Travel Shepherd</h1>
                  <LoginBtn />
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   )
}

export default HomePage