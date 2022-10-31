import React from 'react'
import UserCard from '../cards/UserCard'

function UsersContainer (props) {
   const { users } = props

   const cards = users.map(user => {
      return (
         <UserCard key={user.id} user={user} />
      )
   })

   return (
      <div>
         {cards}
      </div>
   )
}

export default UsersContainer