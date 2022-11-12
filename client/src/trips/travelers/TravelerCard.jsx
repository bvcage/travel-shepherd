import '../../assets/css/cards.css'

function TravelerCard (props) {
   const { traveler } = props
   const { first_name, last_name, username, email } = traveler

   return (
      <div className='card'>
         <div className='card-body'>
            <h5 className='card-title'>{first_name} {last_name}</h5>
            <h6 className='card-subtitle'>@{username}</h6>
            <p>{email}</p>
         </div>
      </div>
   )
}

export default TravelerCard