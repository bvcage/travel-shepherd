import '../assets/css/HomePage.css'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

function HomePage (props) {
   const location = useLocation()
   const path = location.pathname.split('/')
   const navigate = useNavigate()
   const username = useSelector(state => state.user.username)

   if (!!username) return (<Navigate to='/home' />)
   return (
      <div id='home-page' className='container-fluid'>
         <div id='home-page-outlet'>
            <h1>Travel Shepherd</h1>
            <Outlet />
         </div>
      </div>
   )
}

export default HomePage