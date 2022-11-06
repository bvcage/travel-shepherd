import './cards.css'

function UserCard (props) {
   const { user } = props
   const { first_name, last_name, username } = user

   return (
      <div className='card'>
         <div className='card-body'>
            <h5 className='card-title'>{first_name} {last_name}</h5>
            <h6 className='card-subtitle'>@{username}</h6>
         </div>
      </div>
   )
}

export default UserCard