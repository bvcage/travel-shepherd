import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Nav } from 'react-bootstrap'
import LogoutBtn from './buttons/LogoutBtn'

const selectUser = state => state.user

function NavBar (props) {
   const navigate = useNavigate()
   const user = useSelector(selectUser)
   return (
      <nav className='navbar'>
         <div className='container-fluid'>
            <ul className='nav nav-tabs'>
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
               <li className='nav-item'>
                  <div className='nav-link' onClick={() => navigate(user.username + '/profile')}>profile</div>
               </li>
            </ul>
            <LogoutBtn style={{float: 'right'}} />
         </div>
      </nav>
   )
}

export default NavBar