import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LogoutBtn (props) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   function handleLogout (e) {
      fetch('/logout', {
         method: 'DELETE'
      }).then(r=>{
         if (r.ok) {
            dispatch({type: 'user/userLoggedOut', payload: {}})
            dispatch({type: 'trips/userLoggedOut', payload: {}})
            localStorage.removeItem('user')
            navigate('/welcome')
         }
         else console.log(r)
      })
   }

   return (
      <div onClick={handleLogout}>logout</div>
   )
}

export default LogoutBtn