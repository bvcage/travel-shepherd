import UserCard from '../cards/UserCard'

function UsersContainer (props) {
   const { users } = props

   const cards = !!users ? users.map(user => {
      return (
         <div key={user.id} className='col col-12 col-xl-6 mb-3'>
            <div className='container-fluid p-0'>
               <UserCard key={user.id} user={user} />
            </div>
         </div>
      )
   }) : null

   return (
      <div className='container'>
         <div className='row'>
            {cards}
         </div>
      </div>
   )
}

export default UsersContainer