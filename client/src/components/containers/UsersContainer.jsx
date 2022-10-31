import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from '../cards/UserCard'

function UsersContainer (props) {
   const { users, mayInvite, trip } = props
   const navigate = useNavigate()

   const cards = !!users ? users.map(user => {
      return (
         <UserCard key={user.id} user={user} />
      )
   }) : null

   const inviteToggle = (<button type='button' onClick={() => navigate('invite', {state: {trip: trip, users: users}})}>+ invite</button>)

   return (
      <div>
         <h6>user container</h6>
         {cards}
         {mayInvite ? inviteToggle : null}
      </div>
   )
}

export default UsersContainer