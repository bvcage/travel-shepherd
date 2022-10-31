import React from 'react'

function UserCard (props) {
   const { user } = props
   const { first_name, last_name, username } = user

   return (
      <div className='card'>
         <h5 className='card-title'>{first_name} {last_name}</h5>
         <h6 className='card-subtitle'>@{username}</h6>
      </div>
   )
}

export default UserCard