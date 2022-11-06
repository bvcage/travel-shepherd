import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './buttons/LogoutBtn'

const selectUser = state => state.user

function NavBar (props) {
   const navigate = useNavigate()
   const user = useSelector(selectUser)
   return (
      <nav className='navbar navbar-expand-lg'>
         <div className='navbar-brand'>
            <h1>Travel Shepherd</h1>
         </div>
         <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
         </button>
         <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
               <li className='nav-item'>
                  <div className='nav-link' onClick={() => navigate('home')}>home</div>
               </li>
               <li className='nav-item'>
                  <div className='nav-link' onClick={() => navigate('destinations')}>destinations</div>
               </li>
               <li className='nav-item'>
                  <div className='nav-link' onClick={() => navigate(user.username + '/trips', {state: {user: user}})}>trips</div>
               </li>
               <li className='nav-item'>
                  <div className='nav-link' onClick={() => navigate('/trips/new')}>new trip</div>
               </li>
            </ul>
         </div>
         <div className='nav navbar-right me-4'>
            <div class='btn-group'>
               <button id='userProfileDropdown'
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  >{user.username}</button>
               <div className='dropdown-menu dropdown-menu-end' aria-labelledby='userProfileDropdown'>
                  <div className='dropdown-item' onClick={() => navigate(user.username + '/profile')}>profile</div>
                  <div className='dropdown-item disabled'>settings</div>
                  <div className='dropdown-divider' />
                  <div className='dropdown-item'><LogoutBtn /></div>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default NavBar