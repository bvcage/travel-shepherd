import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './buttons/LogoutBtn'

const selectUsername = state => state.user.username

function NavBar (props) {
   const navigate = useNavigate()
   const username = useSelector(selectUsername)
   return (
      <nav>
         <button onClick={() => navigate('/' + username)}>home</button>
         <button onClick={() => navigate('profile')}>profile</button>
         <LogoutBtn />
      </nav>
   )
}

export default NavBar