import UserCard from '../cards/UserCard'

function UsersContainer (props) {
   const { users } = props

   const cards = !!users ? users.map(user => {
      return (
         <UserCard key={user.id} user={user} />
      )
   }) : null

   return (
      <div>
         <h6>user container</h6>
         {cards}
      </div>
   )
}

export default UsersContainer