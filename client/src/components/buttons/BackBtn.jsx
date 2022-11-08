import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function BackBtn (props) {
   const location = useLocation()
   const navigate = useNavigate()

   const path = location.pathname.split('/')
   path.pop()
   const back = path.join('/')

   const backpath = !!props.path ? props.path : back
   
   return (
      <button type='button'
         className='btn btn-secondary'
         onClick={() => navigate(backpath)}
         >back</button>
   )
}

export default BackBtn