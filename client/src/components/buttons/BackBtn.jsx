import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function BackBtn (props) {
   const location = useLocation()
   const navigate = useNavigate()

   const path = location.pathname.split('/')
   path.pop()
   const back = path.join('/')
   
   return (
      <button type='button'
         className='btn'
         onClick={() => navigate(back)}
         >back</button>
   )
}

export default BackBtn