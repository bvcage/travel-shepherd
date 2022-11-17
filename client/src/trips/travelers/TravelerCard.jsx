import '../../assets/css/cards.css'

function TravelerCard (props) {
   const { traveler, onClick } = props
   const { first_name, last_name, username, email } = traveler

   return (
      <div className='card traveler-card'>
         <div className='card-body' onClick={() => onClick(username)}>
            <h5 className='card-title'>{first_name} {last_name}</h5>
            <h6 className='card-subtitle'>@{username}</h6>
         </div>
         <div className='card-footer'>
            {email}
         </div>
      </div>
   )
}

export default TravelerCard