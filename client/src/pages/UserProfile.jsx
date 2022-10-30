import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const selectUser = state => state.user

function UserProfile (props) {
   const params = useParams()
   const user = useSelector(selectUser)
   return (
      <div>
         <h2>{user.username} Profile</h2>
      </div>
   )
}

export default UserProfile