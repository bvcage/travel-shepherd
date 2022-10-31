import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function RedirectPage (props) {
   const { path } = props
   const user = useSelector(state => state.user)
   const pathAry = path.split('/')
   if (pathAry.includes(':username')) {
      const index = pathAry.indexOf(':username')
      pathAry[index] = user.username
   }
   return (
      <Navigate to={pathAry.join('/')} />
   )
}

export default RedirectPage