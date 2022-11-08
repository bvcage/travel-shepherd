import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

function RedirectPage (props) {
   const { path } = props
   const pathAry = path.split('/')
   const params = useParams()
   const user = useSelector(state => state.user)
   if (pathAry.includes(':username')) {
      const index = pathAry.indexOf(':username')
      pathAry[index] = user.username
   } else if (pathAry.includes(':trip_id')) {
      const index = pathAry.indexOf(':trip_id')
      pathAry[index] = params.id
   }
   return (
      <Navigate to={pathAry.join('/')} />
   )
}

export default RedirectPage