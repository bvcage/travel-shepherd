import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './buttons/LogoutBtn'

const selectUser = state => state.user

function NavBar (props) {
   const navigate = useNavigate()
   const user = useSelector(selectUser)
   return (
      <nav>
         <button onClick={() => navigate('home')}>home</button>
         <button onClick={() => navigate(user.username + '/trips', {state: {user: user}})}>trips</button>
         <button onClick={() => navigate(user.username + '/trips/new')}>new trip</button>
         <button onClick={() => navigate(user.username + '/profile')}>profile</button>
         <LogoutBtn />
      </nav>
   )
}

export default NavBar